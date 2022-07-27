import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useGetQuery } from '../../hooks/useGetQuery';
import CommentFeed from '../CommentFeed';
import Room from '../Room/Room';

export default function RoomPage() {
  const { roomid } = useParams();

  if (!roomid) {
    throw new Error('Invalid path. Could not get param "roomid", which is required for RoomPage.');
  }

  const roomQueryFn = useGetQuery('getRoomById', { params: { roomid } });

  const { data: roomData, status: roomStatus } = useQuery('getRoomById', roomQueryFn);

  return (
    <div>
      <div>
        {roomStatus === 'success' ? <Room room={roomData} /> : <div>Loading...</div>}
      </div>
      <div>
        <CommentFeed roomId={roomid} />
      </div>
    </div>
  );
}
