import { PaginatedResponseData } from '@isaiahaiasi/voxelatlas-spec';
import Comment from '../Comment/Comment';
import Feed from '../Feed';

interface CommentFeedProps {
  roomId: string;
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
