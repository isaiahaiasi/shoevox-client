import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import { useQueryOperation } from '../hooks/useFetch';
import CommentFeed from './CommentFeed';
import ErrorAlert from './ErrorAlert';
import CommentForm from './Form/CommentForm';
import { Container } from './Primitives';
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

  const reqData = {
    params: { roomid },
    query: {},
    body: {},
  };

  const { data: roomData, status: roomStatus } = useQueryOperation('getRoomById', reqData);

  return (
    <Container>
      {roomStatus === 'success'
        ? render.success(roomData!.data)
        : render[roomStatus]()}
      <CommentForm roomId={roomid} />
      <CommentFeed roomId={roomid} />
    </Container>
  );
}
