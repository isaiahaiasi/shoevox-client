interface SkeletonProps {
  variant: 'Rectangular' | 'Text' | 'Circle';
}

export default function Skeleton({ variant }: SkeletonProps) {
  // const variantStyle = `variant${variant}`;
  return (
    <div className="" />
  );
}
