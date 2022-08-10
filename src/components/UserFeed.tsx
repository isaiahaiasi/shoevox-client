import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import ErrorAlert from './ErrorAlert';
import Feed from './Feed';
import { Typography } from './primitives';
import Container from './primitives/Container';
import Room from './Room';
import { FeedSkeleton, RoomSkeleton } from './Skeletons';
import Skeleton from './Skeletons/Skeleton';

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

  const { data } = useFetch('getUserById', { params: { userid } });

  const reqData = { params: { userid }, query: { limit: String(limit) } };

  return (
    <Container>
      <Typography.Header level={1}>
        {data?.username ?? <Skeleton variant="text" />}
      </Typography.Header>
      <Typography.Caption>
        Joined {data?.createdAt ?? '???'}
      </Typography.Caption>
      <Feed reqData={reqData} operationId={operationId} render={render} />
    </Container>
  );
}
