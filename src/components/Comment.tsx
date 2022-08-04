import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Link } from 'react-router-dom';
import Typography from './primitives/Typography';

interface CommentProps {
  comment: Dto['Comment'];
}

export default function Comment({ comment }: CommentProps) {
  const { content, user, createdAt } = comment;

  return (
    <div>
      <Typography.Body>{content}</Typography.Body>
      <Typography.Caption>
        posted by <Link to={`/u/${user.id}`}>{user.username}</Link> on {createdAt}
      </Typography.Caption>
    </div>
  );
}
