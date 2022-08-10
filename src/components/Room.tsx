import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Container, Link, Typography } from './primitives';

interface RoomProps {
  room: Dto['Room'];
}

export default function Room({ room }: RoomProps) {
  return (
    <article>
      <Container>
        <Typography.Header level={2}>
          <Link to={`/r/${room.id}`}>
            {room.title}
          </Link>
        </Typography.Header>
        <Typography.Caption>
          Created on {room.createdAt} by
          {' '}
          <Link to={`/u/${room.creator.id}`}>{room.creator.username}</Link>
        </Typography.Caption>
      </Container>
    </article>
  );
}
