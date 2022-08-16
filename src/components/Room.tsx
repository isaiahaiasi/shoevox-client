import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { getTimestampText } from '../utils/dateUtils';

import { RoomLink, UserLink } from './Links';
import { Container, Typography } from './Primitives';

interface RoomProps {
  room: Dto['Room'];
}

export default function Room({ room }: RoomProps) {
  const randIndex = Math.floor(Math.random() * 6);
  const randStep = Math.floor(Math.random() * 2) + 1;

  const bgGradientFrom = [
    'from-cyan-500',
    'from-rose-500',
    'from-fuchsia-500',
    'from-indigo-500',
    'from-sky-500',
    'from-orange-500',
  ][randIndex];

  const bgGradientTo = [
    'to-cyan-500',
    'to-rose-500',
    'to-fuchsia-500',
    'to-indigo-500',
    'to-sky-500',
    'to-orange-500',
  ][(randIndex + randStep) % 6];

  const timestamp = getTimestampText(room.createdAt);

  return (
    <article>
      <Container>
        <Typography.Header level={2}>
          <RoomLink room={room} />
        </Typography.Header>
        <div className={`rounded-lg h-36 bg-gradient-to-r ${bgGradientFrom} ${bgGradientTo}`} />
        <Typography.Caption>
          <div className="flex justify-between">
            <div>
              <span>{room.commentCount} Comments</span>
              {', '}
              <span>{room.likeCount} Likes</span>
            </div>
            <div>
              Created {timestamp} by
              {' '}
              <UserLink user={room.creator} />
            </div>
          </div>
        </Typography.Caption>
      </Container>
    </article>
  );
}
