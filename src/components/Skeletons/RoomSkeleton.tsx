import Skeleton from './Skeleton';

export default function RoomSkeleton() {
  return (
    <div className="w-full max-w-prose flex flex-col">
      <Skeleton variant="text" />
      <div className="h-36">
        <Skeleton variant="rectangular" />
      </div>
      <div className="w-full max-w-sm flex items-center self-end">
        <Skeleton variant="text" />
        <Skeleton variant="circle" />
      </div>
    </div>
  );
}
