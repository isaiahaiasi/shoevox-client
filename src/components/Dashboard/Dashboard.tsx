import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useGetPaginatedQuery } from '../../hooks/useGetQuery';
import Feed from '../Feed';
import Room from '../Room';

const OPERATION = 'getRooms';

const render = {
  success: (room: Dto['Room']) => <Room key={room.id} room={room} />,
  error: () => <div>Something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

export default function Dashboard() {
  const queryFn = useGetPaginatedQuery(OPERATION, { query: { limit: '15' } });

  // This looks like queryFn can be derived from OPERATION alone,
  // but currently there's no way to distinguish OPERATIONs that return paginated responses,
  // so I can't guarantee that the queryFn I get will extend RootPaginatedResponse
  return <Feed queryFn={queryFn} queryKey={OPERATION} render={render} />;
}
