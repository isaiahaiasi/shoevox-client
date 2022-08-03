import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface RoomProps {
  room: Dto['Room'];
}

export default function Room({ room }: RoomProps) {
  return (
    <article>
      <Container>
        <Typography variant="h2">
          <Link to={`/r/${room.id}`}>
            {room.title}
          </Link>
        </Typography>
        <Typography variant="caption">
          Created on {room.createdAt} by
          {' '}
          <Link to={`/u/${room.creator.id}`}>{room.creator.username}</Link>
        </Typography>
      </Container>
    </article>
  );
}
