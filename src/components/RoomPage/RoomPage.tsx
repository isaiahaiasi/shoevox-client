import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import CommentFeed from '../CommentFeed';
import Room from '../Room/Room';

const render = {
  success: (room: Dto['Room']) => <Room room={room} />,
  loading: () => <div>Loading...</div>,
  error: () => <div>Something went wrong!</div>,
};

export default function RoomPage() {
  const { roomid } = useParams();

  if (!roomid) {
    throw new Error('Invalid path. Could not get param "roomid", which is required for RoomPage.');
  }

  const reqData = { params: { roomid } };

  const { data: roomData, status: roomStatus } = useFetch('getRoomById', reqData);

  return (
    <div>
      <div>
        {render[roomStatus](roomData!)}
      </div>
      <div>
        <CommentFeed roomId={roomid} />
      </div>
    </div>
  );
}
