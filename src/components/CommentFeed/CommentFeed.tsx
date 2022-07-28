import { Dto, PaginatedResponseData } from '@isaiahaiasi/voxelatlas-spec';
import { Link } from 'react-router-dom';
import Feed from '../Feed';

interface CommentFeedProps {
  roomId: string;
}

interface CommentProps {
  comment: Dto['Comment'];
}

function Comment({ comment }: CommentProps) {
  const { content, user, createdAt } = comment;

  return (
    <div>
      <div>{content}</div>
      <div>posted by <Link to={`/u/${user.id}`}>{user.username}</Link> on {createdAt}</div>
    </div>
  );
}

const operationId = 'getCommentsByRoomId';

const render = {
  // eslint-disable-next-line arrow-body-style
  success: (comment: PaginatedResponseData<typeof operationId>) => {
    return <Comment key={comment.id} comment={comment} />;
  },
  error: () => <div>Something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

export default function CommentFeed({ roomId }: CommentFeedProps) {
  const reqData = {
    params: { roomid: roomId },
    query: { limit: '3' },
  };

  return (
    <div>
      <h3>Comments</h3>
      <Feed reqData={reqData} operationId={operationId} render={render} />
    </div>
  );
}
