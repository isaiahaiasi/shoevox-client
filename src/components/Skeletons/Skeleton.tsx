type SkeletonVariants = 'rectangular' | 'text' | 'circle';

interface SkeletonProps {
  variant: SkeletonVariants;
}

const skeletonStyles: { [key in SkeletonVariants]: string } = {
  rectangular: 'rounded-none h-8',
  circle: 'rounded-full h-6',
  text: 'h-4',
};

export default function Skeleton({ variant }: SkeletonProps) {
  return (
    <div className={`bg-gray-500 animate-pulse p-1 rounded ${skeletonStyles[variant]}`} />
  );
}
