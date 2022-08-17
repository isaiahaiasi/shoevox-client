import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Outlet, useParams } from 'react-router-dom';
import { useQueryOperation } from '../hooks/useFetch';
import ErrorAlert from './ErrorAlert';
import CommentFeed from './Feeds/CommentFeed';
import CommentForm from './Forms/CommentForm';
import LikeButton from './LikeButton';
import { Container, Link } from './Primitives';
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

      <Container className="flex gap-2 items-center">
        <LikeButton roomId={roomid} />
        <Link to="likes">{roomData?.data.likeCount ?? '???'} likes</Link>
      </Container>

      {/* LIKE FEED: */}
      <Outlet />

      <CommentForm roomId={roomid} />
      <CommentFeed roomId={roomid} />
    </Container>
  );
}
