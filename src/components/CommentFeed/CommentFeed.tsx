import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Container, Typography } from '@mui/material';
import Comment from '../Comment/Comment';
import ErrorAlert from '../ErrorAlert';
import Feed from '../Feed';
import { CommentSkeleton, FeedSkeleton } from '../Skeletons';

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
    <Container maxWidth="sm">
      <Typography variant="h3">Comments</Typography>
      <Feed reqData={reqData} operationId={operationId} render={render} />
    </Container>
  );
}
