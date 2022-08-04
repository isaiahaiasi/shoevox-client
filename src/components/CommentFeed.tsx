import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import Comment from './Comment';
import ErrorAlert from './ErrorAlert';
import Feed from './Feed';
import { Container, Typography } from './primitives';
import { CommentSkeleton, FeedSkeleton } from './Skeletons';

interface CommentFeedProps {
  roomId: string;
}

const operationId = 'getCommentsByRoomId';
const commentCount = 3;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={commentCount} skeleton={<CommentSkeleton />} />,
  success: (comment: Dto['Comment']) => <Comment comment={comment} />,
};

export default function CommentFeed({ roomId }: CommentFeedProps) {
  const reqData = {
    params: { roomid: roomId },
    query: { limit: String(commentCount) },
  };

  return (
    <Container>
      <Typography.Header level={3}>Comments</Typography.Header>
      <Feed reqData={reqData} operationId={operationId} render={render} />
    </Container>
  );
}
