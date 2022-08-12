import Skeleton from './Skeleton';

export default function CommentSkeleton() {
  return (
    <div className="w-full flex flex-col">
      <Skeleton variant="text" />
      <div className="w-2/3">
        <Skeleton variant="text" />
      </div>
      <div className="w-full max-w-sm flex items-center">
        <Skeleton variant="circle" />
        <Skeleton variant="text" />
      </div>
    </div>
  );
}
