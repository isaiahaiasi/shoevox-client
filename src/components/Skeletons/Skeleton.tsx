import styles from './skeleton.module.scss';

interface SkeletonProps {
  variant: 'Rectangular' | 'Text' | 'Circle';
}

export default function Skeleton({ variant }: SkeletonProps) {
  const variantStyle = `variant${variant}`;
  return (
    <div className={`${styles.skeleton} ${styles[variantStyle]}`} />
  );
}
