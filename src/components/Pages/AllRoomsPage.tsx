import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { BASE_REQ_DATA } from '../../utils/fetchUtils';
import ErrorAlert from '../ErrorAlert';
import Feed from '../Feed';
import { Container, Typography } from '../Primitives';
import Room from '../Room';
import { FeedSkeleton, RoomSkeleton } from '../Skeletons';

const limit = 10;

const render = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={limit} skeleton={<RoomSkeleton />} />,
  success: (room: Dto['Room']) => <Room room={room} />,
};

const reqData = {
  ...BASE_REQ_DATA,
  query: { limit: String(limit) },
};

export default function AllRoomsPage() {
  return (
    <Container>
      <Typography.Header level={1}>See What&apos;s New</Typography.Header>
      <Feed operationId="getRooms" reqData={reqData} render={render} />
    </Container>
  );
}
