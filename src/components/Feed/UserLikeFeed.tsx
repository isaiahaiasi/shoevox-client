import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../ErrorAlert';
import Room from '../Room';
import { FeedSkeleton } from '../Skeletons';
import Skeleton from '../Skeletons/Skeleton';
import Feed from './Feed';

const LIMIT = 10;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={LIMIT} skeleton={<Skeleton variant="text" />} />,
  success: (room: Dto['Room']) => <Room room={room} />,
};

export default function UserLikeFeed() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error('roomid path param is required.');
  }

  const reqData = {
    body: {},
    params: { userid },
    query: { limit: String(LIMIT), rel: 'liked' },
  } as const;

  return (
    <Feed render={render} operationId="getRoomsByUserId" reqData={reqData} />
  );
}
