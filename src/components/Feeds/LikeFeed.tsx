import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../ErrorAlert';
import Like from '../Like';
import { Container, Typography } from '../Primitives';
import { FeedSkeleton } from '../Skeletons';
import Skeleton from '../Skeletons/Skeleton';
import Feed from './Feed';

const LIMIT = 20;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={LIMIT} skeleton={<Skeleton variant="text" />} />,
  success: (like: Dto['Like']) => <Like like={like} />,
};

export default function LikeFeed() {
  const { roomid } = useParams();

  if (!roomid) {
    throw new Error('roomid path param is required.');
  }

  const reqData = {
    body: {},
    params: { roomid },
    query: { limit: String(LIMIT) },
  };

  return (
    <Container>
      <Typography.Header level={3}>Likes</Typography.Header>
      <Feed
        render={render}
        operationId="getLikesByRoomId"
        reqData={reqData}
      />
    </Container>
  );
}
