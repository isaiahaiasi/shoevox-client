import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { getTimestampText } from '../utils/dateUtils';
import { UserLink } from './Links';
import { Link } from './Primitives';

interface LikeEntryProps {
  like: Dto['Like'];
}

export default function Like({ like: { user, createdAt, room } }: LikeEntryProps) {
  return (
    <div>
      <UserLink user={user} />
      {' '}
      liked
      {' '}
      <Link to={`/r/${room}`}>
        Room {room}
      </Link>
      {' '}
      {getTimestampText(createdAt)}
    </div>
  );
}
