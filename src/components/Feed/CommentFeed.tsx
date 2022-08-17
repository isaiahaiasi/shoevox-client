import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import Comment from '../Comment';
import ErrorAlert from '../ErrorAlert';
import Feed from './Feed';
import { CommentSkeleton, FeedSkeleton } from '../Skeletons';

const operationId = 'getCommentsByRoomId';
const LIMIT = 10;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={LIMIT} skeleton={<CommentSkeleton />} />,
  success: (comment: Dto['Comment']) => <Comment comment={comment} />,
};

export default function CommentFeed() {
  const { roomid } = useParams();

  if (!roomid) {
    throw new Error('roomid path param is required.');
  }

  const reqData = {
    params: { roomid },
    query: { limit: String(LIMIT) },
    body: {},
  };

  return (
    <Feed reqData={reqData} operationId={operationId} render={render} />
  );
}
