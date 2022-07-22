import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { getPaginatedQuery } from '../../utils/queries';
import Feed from '../Feed';
import Room from '../Room';

const OPERATION = 'getRooms';

const fetchRooms = getPaginatedQuery(OPERATION);

const render = {
  success: (room: Dto['Room']) => <Room key={room.id} room={room} />,
  error: () => <div>Something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

export default function Dashboard() {
  return <Feed queryFn={fetchRooms} queryKey={OPERATION} render={render} />;
}
