import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import CommentFeed from './CommentFeed';
import ErrorAlert from './ErrorAlert';
import Container from './primitives/Container';
import Room from './Room';
import { RoomSkeleton } from './Skeletons';

const render = {
  success: (room: Dto['Room']) => <Room room={room} />,
  loading: () => <RoomSkeleton />,
  error: () => <ErrorAlert />,
};

export default function RoomPage() {
  const { roomid } = useParams();

  if (!roomid) {
    throw new Error('Invalid path. Could not get param "roomid", which is required for RoomPage.');
  }

  const reqData = { params: { roomid } };

  const { data: roomData, status: roomStatus } = useFetch('getRoomById', reqData);

  return (
    <Container>
      {render[roomStatus](roomData!)}
      <CommentFeed roomId={roomid} />
    </Container>
  );
}
