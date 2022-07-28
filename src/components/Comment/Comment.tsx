import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Link } from 'react-router-dom';

interface CommentProps {
  comment: Dto['Comment'];
}

export default function Comment({ comment }: CommentProps) {
  const { content, user, createdAt } = comment;

  return (
    <div>
      <div>{content}</div>
      <div>posted by <Link to={`/u/${user.id}`}>{user.username}</Link> on {createdAt}</div>
    </div>
  );
}
