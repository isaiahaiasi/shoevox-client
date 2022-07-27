import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useGetQuery } from '../../hooks/useGetQuery';
import { getUrl } from '../../utils/queries';
import CommentFeed from '../CommentFeed';
import Room from '../Room/Room';

const operationId = 'getRoomById';

const render = {
  success: (room: Dto['Room']) => <Room room={room} />,
  loading: () => <div>Loading...</div>,
  error: () => <div>Something went wrong!</div>,
  idle: () => <div>Idle...</div>, // TODO: should be unnecessary after upgrading RQ version
};

export default function RoomPage() {
  const { roomid } = useParams();

  if (!roomid) {
    throw new Error('Invalid path. Could not get param "roomid", which is required for RoomPage.');
  }

  const reqData = { params: { roomid } };

  const roomQueryFn = useGetQuery('getRoomById', reqData);

  const url = getUrl(operationId, reqData);

  const { data: roomData, status: roomStatus } = useQuery(url, roomQueryFn);

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
