import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useGetPaginatedQuery } from '../../hooks/useGetQuery';
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
      <div>posted by {user.username} on {createdAt}</div>
    </div>
  );
}

const OPERATION = 'getCommentsByRoomId';

const render = {
  success: (comment: Dto['Comment']) => <Comment key={comment.id} comment={comment} />,
  error: () => <div>Something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

export default function CommentFeed({ roomId }: CommentFeedProps) {
  const reqData = {
    params: { roomid: roomId },
    query: { limit: '3' },
  };

  const queryFn = useGetPaginatedQuery(OPERATION, reqData);

  return (
    <div>
      <h3>Comments</h3>
      <Feed queryFn={queryFn} queryKey={OPERATION} render={render} />
    </div>
  );
}
