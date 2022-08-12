import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { getTimestampText } from '../utils/dateUtils';
import { UserLink } from './Links';
import { Typography } from './Primitives';

interface CommentProps {
  comment: Dto['Comment'];
}

export default function Comment({ comment }: CommentProps) {
  const { content, user, createdAt } = comment;

  const timestamp = getTimestampText(createdAt);

  return (
    <div>
      <Typography.Body>{content}</Typography.Body>
      <Typography.Caption>
        Posted {timestamp} by <UserLink user={user} />
      </Typography.Caption>
    </div>
  );
}
