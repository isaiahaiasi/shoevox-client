import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { UserLink } from './Links';
import { Typography } from './Primitives';

interface CommentProps {
  comment: Dto['Comment'];
}

export default function Comment({ comment }: CommentProps) {
  const { content, user, createdAt } = comment;

  return (
    <div>
      <Typography.Body>{content}</Typography.Body>
      <Typography.Caption>
        posted by <UserLink user={user} /> on {createdAt}
      </Typography.Caption>
    </div>
  );
}
