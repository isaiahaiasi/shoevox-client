import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useGetPaginatedQuery } from '../../hooks/useGetQuery';
import Feed from '../Feed';

interface CommentFeedProps {
  roomId: string;
}

const OPERATION = 'getCommentsByRoomId';

const render = {
  success: (comment: Dto['Comment']) => <div key={comment.id}>{comment.content}</div>,
  error: () => <div>Something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

export default function CommentFeed({ roomId }: CommentFeedProps) {
  const reqData = {
    params: { roomid: roomId },
    query: { limit: '3' },
  };

  const queryFn = useGetPaginatedQuery(OPERATION, reqData);

  return <Feed queryFn={queryFn} queryKey={OPERATION} render={render} />;
}
