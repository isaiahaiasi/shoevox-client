import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import useAuth from '../../hooks/useAuth';
import ErrorAlert from '../ErrorAlert';
import Feed from '../Feed';
import { Container, Typography } from '../Primitives';
import Room from '../Room';
import { FeedSkeleton, RoomSkeleton } from '../Skeletons';

const operationId = 'getRoomsByUserId';
const limit = 10;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={limit} skeleton={<RoomSkeleton />} />,
  success: (room: Dto['Room']) => <Room room={room} />,
};

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    throw new Error('Could not find currently logged in user!');
  }

  const reqData = {
    query: { limit: String(limit) },
    body: {},
    params: { userid: user.id },
  };

  return (
    <Container>
      <Typography.Header level={1}>Your Dashboard</Typography.Header>
      <Feed reqData={reqData} operationId={operationId} render={render} />
    </Container>
  );
}
