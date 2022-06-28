import { QueryFunction, useInfiniteQuery } from 'react-query';
import PaginatedData from '../PaginatedData';

const ROOM_URL = `${import.meta.env.VITE_API_URL}/rooms?limit=5`;

const fetchRooms: QueryFunction<any, 'dashboard'> = async ({ pageParam }) => {
  const url = pageParam ? `${ROOM_URL}&cursor=${pageParam}` : ROOM_URL;
  const res = await fetch(url);
  return res.json();
};

export default function Dashboard() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    'dashboard',
    fetchRooms,
    { getNextPageParam: (lastPage) => lastPage.links.next?.cursor },
  );

  switch (status) {
    case 'error': return <div>Something went wrong!</div>;
    case 'loading': return <div>Loading...</div>;
    case 'success':
      return (
        <div>
          <PaginatedData
            data={data}
            renderFn={(room: any) => (
              <div key={room.id}>{room.title}</div>)}
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
    default: return <div>Default case. Not sure what happened here...</div>;
  }
}
