import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Link } from '../Primitives';

interface RoomLinkProps {
  room: Dto['Room'];
}

// I like the idea of making this fancier later--maybe a hover effect with voxel preview?
export default function RoomLink({ room }: RoomLinkProps) {
  const { id, title } = room;

  return <Link to={`/r/${id}`}>{title}</Link>;
}
