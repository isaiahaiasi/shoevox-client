import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { getTimestampText } from '../utils/dateUtils';
import { UserLink } from './Links';

interface LikeEntryProps {
  like: Dto['Like'];
}

export default function Like({ like: { user, createdAt } }: LikeEntryProps) {
  return (
    <div>
      <UserLink user={user} /> liked {getTimestampText(createdAt)}
    </div>
  );
}
