import { PaginatedOperationId, zSchemas, PaginatedResponseData } from '@isaiahaiasi/voxelatlas-spec';
import { z } from 'zod';
import { useInfiniteFetch } from '../hooks/useFetch';
import PaginatedData from './PaginatedData';
import { Button } from './primitives';

interface FeedProps<S extends PaginatedOperationId> {
  operationId: S;
  reqData: z.infer<typeof zSchemas.requests[S]>;
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
  } = useInfiniteFetch(operationId, reqData);

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
          <Button
            variant="outlined"
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load more' : 'No more!'}
          </Button>
        </>
      );
    default:
      throw new Error(`Unhandled status ${status}!`);
  }
}
