import { PaginatedOperationId } from '@isaiahaiasi/voxelatlas-spec/public/paginatedOperationId';
import { ApiRequest } from '@isaiahaiasi/voxelatlas-spec/public/types';
import ErrorAlert from '../ErrorAlert';
import Room from '../Room';
import { FeedSkeleton, RoomSkeleton } from '../Skeletons';
import Feed from './Feed';

// TODO: fix render.success typing

interface RoomFeedProps<S extends PaginatedOperationId> {
  operationId: S;
  reqData: ApiRequest<S>;
  render: Partial<{
    error: () => React.ReactNode;
    loading: () => React.ReactNode;
    success: (data: any) => React.ReactNode;
  }>;
}

const defaultRender = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={10} skeleton={<RoomSkeleton />} />,
  success: (room: any) => <Room room={room} />,
};

export default function RoomFeed<S extends PaginatedOperationId>(
  { reqData, operationId, render: customRender }: RoomFeedProps<S>,
) {
  const render = {
    ...defaultRender,
    ...customRender,
  };

  return (
    <Feed reqData={reqData} operationId={operationId} render={render} />
  );
}
