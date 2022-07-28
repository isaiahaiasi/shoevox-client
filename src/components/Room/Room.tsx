import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Link } from 'react-router-dom';

interface RoomProps {
  room: Dto['Room'];
}

export default function Room({ room }: RoomProps) {
  return (
    <article>
      <h2><Link to={`/r/${room.id}`}>{room.title}</Link></h2>
      <div>
        <div>Created on {room.createdAt} by <Link to={`/u/${room.creator.id}`}>{room.creator.username}</Link></div>
      </div>
    </article>
  );
}
