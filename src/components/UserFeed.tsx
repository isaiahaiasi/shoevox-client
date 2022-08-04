import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';
import Feed from './Feed';
import Container from './primitives/Container';
import Room from './Room';
import { FeedSkeleton, RoomSkeleton } from './Skeletons';

const operationId = 'getRoomsByUserId';
const limit = 5;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={limit} skeleton={<RoomSkeleton />} />,
  success: (room: Dto['Room']) => <Room room={room} />,
};

export default function UserFeed() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error('Could not find userid in url path, which is required for UserFeed component!');
  }

  const reqData = { params: { userid }, query: { limit: String(limit) } };

  return (
    <Container>
      <Feed reqData={reqData} operationId={operationId} render={render} />
    </Container>
  );
}
