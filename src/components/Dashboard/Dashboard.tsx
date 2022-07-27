import { PaginatedResponseData } from '@isaiahaiasi/voxelatlas-spec';
import Feed from '../Feed';
import Room from '../Room';

const operationId = 'getRooms';

const render = {
  success: (room: PaginatedResponseData<typeof operationId>) => <Room key={room.id} room={room} />,
  error: () => <div>Something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

const reqData = { query: { limit: '15' } };

export default function Dashboard() {
  return <Feed reqData={reqData} operationId={operationId} render={render} />;
}
