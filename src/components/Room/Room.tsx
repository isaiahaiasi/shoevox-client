import { Dto } from '@isaiahaiasi/voxelatlas-spec';

interface RoomProps {
  room: Dto['Room'];
}

export default function Room({ room }: RoomProps) {
  return (
    <article>
      <div><b>{room.title}</b></div>
      <div>
        <div>Created on {room.createdAt} by {room.creator.username}</div>
      </div>
    </article>
  );
}
