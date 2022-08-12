type SkeletonVariants = 'rectangular' | 'text' | 'circle';

interface SkeletonProps {
  variant: SkeletonVariants;
}

type ContainerStyle = {
  [key in SkeletonVariants]: {
    outer: string;
    inner: string;
  }
};

const skeletonStyles: ContainerStyle = {
  rectangular: {
    outer: 'h-full',
    inner: 'rounded-lg',
  },
  circle: {
    outer: 'h-8 w-8',
    inner: 'rounded-full',
  },
  text: {
    outer: 'h-6 w-full',
    inner: '',
  },
};

export default function Skeleton({ variant }: SkeletonProps) {
  return (
    <div className={`p-1 ${skeletonStyles[variant].outer}`}>
      <div className={`bg-gray-500 animate-pulse h-full w-full rounded ${skeletonStyles[variant].inner}`} />
    </div>
  );
}
