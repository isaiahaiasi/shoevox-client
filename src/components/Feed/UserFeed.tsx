import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../ErrorAlert';
import Room from '../Room';
import { FeedSkeleton, RoomSkeleton } from '../Skeletons';
import Feed from './Feed';

const LIMIT = 5;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={LIMIT} skeleton={<RoomSkeleton />} />,
  success: (room: Dto['Room']) => <Room room={room} />,
};

export default function UserFeed() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error('Could not find userid in url path, which is required for UserFeed component!');
  }

  const requestData = {
    params: { userid },
    query: { limit: String(LIMIT) },
    body: {},
  };

  return (
    <Feed reqData={requestData} operationId="getRoomsByUserId" render={render} />
  );
}
