import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { useParams } from 'react-router-dom';
import Feed from '../Feed';
import Room from '../Room';

const render = {
  success: (room: Dto['Room']) => <Room key={room.id} room={room} />,
  error: () => <div>Sorry, something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

export default function UserFeed() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error('Could not find userid in url path, which is required for UserFeed component!');
  }

  const reqData = { params: { userid }, query: {} };
  return <Feed operationId="getRoomsByUserId" reqData={reqData} render={render} />;
}
