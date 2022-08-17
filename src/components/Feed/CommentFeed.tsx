import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import Comment from '../Comment';
import ErrorAlert from '../ErrorAlert';
import Feed from './Feed';
import { Container, Typography } from '../Primitives';
import { CommentSkeleton, FeedSkeleton } from '../Skeletons';

interface CommentFeedProps {
  roomId: string;
}

const operationId = 'getCommentsByRoomId';
const LIMIT = 10;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={LIMIT} skeleton={<CommentSkeleton />} />,
  success: (comment: Dto['Comment']) => <Comment comment={comment} />,
};

export default function CommentFeed({ roomId }: CommentFeedProps) {
  const reqData = {
    params: { roomid: roomId },
    query: { limit: String(LIMIT) },
    body: {},
  };

  return (
    <Container>
      <Typography.Header level={3}>Comments</Typography.Header>
      <Feed reqData={reqData} operationId={operationId} render={render} />
    </Container>
  );
}
