import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import ErrorAlert from './ErrorAlert';
import Feed from './Feed';
import { Container } from './primitives';
import Room from './Room';
import { FeedSkeleton, RoomSkeleton } from './Skeletons';

const operationId = 'getRooms';
const limit = 10;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={limit} skeleton={<RoomSkeleton />} />,
  success: (room: Dto['Room']) => <Room room={room} />,
};

const reqData = { query: { limit: String(limit) } };

export default function Dashboard() {
  return (
    <Container>
      <Feed reqData={reqData} operationId={operationId} render={render} />
    </Container>
  );
}
