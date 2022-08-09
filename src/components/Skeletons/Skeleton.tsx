type SkeletonVariants = 'rectangular' | 'text' | 'circle';
interface SkeletonProps {
  variant: SkeletonVariants;
}

type SkeletonStyles = { [key in SkeletonVariants | 'base']: string };

const skeletonStyles: SkeletonStyles = {
  base: 'bg-slate-200 animate-pulse',
  rectangular: 'h-8',
  circle: 'rounded-full h-6',
  text: 'rounded h-4',
};

export default function Skeleton({ variant }: SkeletonProps) {
  const variantStyle = [skeletonStyles.base, skeletonStyles[variant]].join(' ');

  return (
    <div className={variantStyle} />
  );
}
