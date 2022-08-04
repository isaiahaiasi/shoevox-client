import styles from './skeleton.module.scss';

interface SkeletonProps {
  variant: 'rectangular' | 'text' | 'circle';
}

export default function Skeleton({ variant }: SkeletonProps) {
  return (
    <div className={styles.skeleton} />
  )
}
