import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getTimestampText } from '../utils/dateUtils';
import ErrorAlert from './ErrorAlert';
import Feed from './Feed';
import { Container, Typography } from './Primitives';
import Room from './Room';
import { FeedSkeleton, RoomSkeleton } from './Skeletons';
import Skeleton from './Skeletons/Skeleton';

const LIMIT = 5;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={LIMIT} skeleton={<RoomSkeleton />} />,
  success: (room: Dto['Room']) => <Room room={room} />,
};

export default function UserFeed() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error('Could not find userid in url path, which is required for UserFeed component!');
  }

  const { data } = useFetch('getUserById', { params: { userid } });

  const reqData = { params: { userid }, query: { limit: String(LIMIT) } };

  const timestamp = data?.createdAt ? getTimestampText(data.createdAt) : null;

  return (
    <Container>
      <Typography.Header level={1}>
        {data?.username ?? <Skeleton variant="text" />}
      </Typography.Header>
      <Typography.Caption>
        Joined {timestamp ?? '???'}
      </Typography.Caption>
      { /* spacer */}
      <div className="h-5" />
      <Feed reqData={reqData} operationId="getRoomsByUserId" render={render} />
    </Container>
  );
}
