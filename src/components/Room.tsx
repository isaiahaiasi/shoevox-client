import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { RoomLink, UserLink } from './Links';
import { Container, Typography } from './primitives';

interface RoomProps {
  room: Dto['Room'];
}

export default function Room({ room }: RoomProps) {
  return (
    <article>
      <Container>
        <Typography.Header level={2}>
          <RoomLink room={room} />
        </Typography.Header>
        <Typography.Caption>
          Created on {room.createdAt} by
          {' '}
          <UserLink user={room.creator} />
        </Typography.Caption>
      </Container>
    </article>
  );
}
