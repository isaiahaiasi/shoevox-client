import { PaginatedOperationId } from '@isaiahaiasi/voxelatlas-spec/public/paginatedOperationId';
import { ApiRequest, PaginatedResponseData } from '@isaiahaiasi/voxelatlas-spec/public/types';
import { useInfiniteQueryOperation } from '../hooks/useFetch';
import PaginatedData from './PaginatedData';
import { Button } from './Primitives';

interface FeedProps<S extends PaginatedOperationId> {
  operationId: S;
  reqData: ApiRequest<S>;
  render: {
    error: () => React.ReactNode;
    loading: () => React.ReactNode;
    success: (data: PaginatedResponseData<S>) => React.ReactNode;
  };
}

export default function Feed<S extends PaginatedOperationId>({
  reqData,
  operationId,
  render,
}: FeedProps<S>) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQueryOperation(operationId, reqData);

  switch (status) {
    case 'error':
    case 'loading':
      return <>{render[status]()}</>;
    case 'success':
      return (
        <>
          <PaginatedData
            pages={data.pages}
            renderFn={render.success}
          />
          <div className="flex justify-center">
            <Button
              variant="outlined"
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load more' : 'No more!'}
            </Button>
          </div>

        </>
      );
    default:
      throw new Error(`Unhandled status ${status}!`);
  }
}
