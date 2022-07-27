/* eslint-disable react/require-default-props */
import { PaginatedOperationId, zSchemas, PaginatedResponseData } from '@isaiahaiasi/voxelatlas-spec';
import { useInfiniteQuery } from 'react-query';
import { z } from 'zod';
import { useGetPaginatedQuery } from '../../hooks/useGetQuery';
import { getUrl } from '../../utils/queries';
import PaginatedData from '../PaginatedData';

interface FeedProps<S extends PaginatedOperationId> {
  operationId: S;
  reqData: z.infer<typeof zSchemas.requests[S]>;
  render: {
    error: () => React.ReactNode;
    loading: () => React.ReactNode;
    success: (data: PaginatedResponseData<S>) => React.ReactNode;
  };
  className?: string;
  style?: React.CSSProperties;
}

export default function Feed<S extends PaginatedOperationId>({
  reqData,
  operationId,
  render,
  className,
  style,
}: FeedProps<S>) {
  const queryKey = getUrl(operationId, reqData).split('?')[0];
  const queryFn = useGetPaginatedQuery(operationId, reqData);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    queryKey,
    queryFn,
    { getNextPageParam: (lastPage) => lastPage.links.next?.cursor },
  );

  // TODO: Verify 'idle' status removed in v4 of react-query
  switch (status) {
    case 'error':
    case 'loading':
      return <div className={className} style={style}>{render[status]()}</div>;
    case 'success':
      return (
        <div className={className} style={style}>
          <PaginatedData
            data={data}
            renderFn={render.success}
          />
          <button
            type="button"
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load more' : 'No more!'}
          </button>
        </div>
      );
    default:
      throw new Error(`Unhandled status ${status}!`);
  }
}
