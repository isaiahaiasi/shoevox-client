/* eslint-disable react/require-default-props */
import { QueryFunction, useInfiniteQuery } from 'react-query';
import { ApiPageData, RootApiObject } from '../../types/apiTypes';
import PaginatedData from '../PaginatedData';

interface FeedProps<T extends RootApiObject, S extends string> {
  queryFn: QueryFunction<ApiPageData<T>, S>;
  queryKey: S;
  render: {
    error: () => React.ReactNode;
    loading: () => React.ReactNode;
    success: (data: T) => React.ReactNode;
  };
  className?: string;
  style?: React.CSSProperties;
}

export default function Feed<T extends RootApiObject, S extends string>({
  queryFn,
  queryKey,
  render,
  className,
  style,
}: FeedProps<T, S>) {
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
