import { QueryFunction } from 'react-query';
import { ApiPageData, RoomDto } from '../../types/apiTypes';
import Feed from '../Feed';
import Room from '../Room';

// TODO: I could probably make this *more* generic, and have feeds for each
// Schema type (Rooms, Comments), where the only thing I need to supply is the
// query identifier (which I can use as the key, and to grab the query function)

const ROOM_URL = `${import.meta.env.VITE_API_URL}/rooms?limit=5`;
const queryKey = 'dashboard';

type FetchRooms = QueryFunction<ApiPageData<RoomDto>, typeof queryKey>;

const fetchRooms: FetchRooms = async ({ pageParam }) => {
  const url = pageParam ? `${ROOM_URL}&cursor=${pageParam}` : ROOM_URL;
  const res = await fetch(url);
  return res.json();
  // TODO: validate via Zod schemas, once those are added to Spec lib
};

const render = {
  success: (room: RoomDto) => <Room key={room.id} room={room} />,
  error: () => <div>Something went wrong!</div>,
  loading: () => <div>Loading...</div>,
};

export default function Dashboard() {
  return <Feed queryFn={fetchRooms} queryKey={queryKey} render={render} />;
}
