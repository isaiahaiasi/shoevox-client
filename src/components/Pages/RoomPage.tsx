import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useQueryOperation } from '../../hooks/useFetch';
import ErrorAlert from '../ErrorAlert';
import CommentForm from '../Forms/CommentForm';
import LikeButton from '../LikeButton';
import { Container } from '../Primitives';
import { Header } from '../Primitives/Typography';
import Room from '../Room';
import { RoomSkeleton } from '../Skeletons';

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
        <div className="flex-1">
          <CommentForm roomId={roomid} />
        </div>
      </Container>

      {/* TODO: extract NavLink as Primitive */}
      <nav className="flex gap-4 pb-4">
        <Header level={3}>
          <NavLink
            to=""
            end
            className={({ isActive }) => (isActive ? 'underline' : undefined)}
          >Comments
          </NavLink>
        </Header>
        <Header level={3}>
          <NavLink
            to="likes"
            className={({ isActive }) => (isActive ? 'underline' : undefined)}
          >Likes
          </NavLink>
        </Header>
      </nav>
      <Outlet />

    </Container>
  );
}
