import { Dto, zSchemas } from '@isaiahaiasi/voxelatlas-spec';
import { QueryFunction } from 'react-query';
import { z } from 'zod';
import Feed from '../Feed';
import Room from '../Room';

// TODO: Extract all this fetch logic out and make it generic
const ROOM_URL = `${import.meta.env.VITE_API_URL}/rooms?limit=5`;
const queryKey = 'dashboard';

type RoomPageData = z.infer<typeof zSchemas.responses.getRooms>;
type FetchRooms = QueryFunction<RoomPageData, typeof queryKey>;

const fetchRooms: FetchRooms = async ({ pageParam }) => {
  const url = pageParam ? `${ROOM_URL}&cursor=${pageParam}` : ROOM_URL;

  return fetch(url)
    .then((res) => res.json())
    .then(zSchemas.responses.getRooms.parse);
};

const render = {
  success: (room: Dto['Room']) => <Room room={room} />,
  error: () => <div>Something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

export default function Dashboard() {
  return <Feed queryFn={fetchRooms} queryKey={queryKey} render={render} />;
}
