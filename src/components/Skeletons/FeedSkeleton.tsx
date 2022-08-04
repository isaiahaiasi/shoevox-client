/* eslint-disable react/no-array-index-key */
import { Stack } from '../primitives';
import { Fragment, ReactNode } from 'react';

interface FeedSkeletonProps {
  count: number;
  skeleton: ReactNode;
}

export default function FeedSkeleton({ count, skeleton }: FeedSkeletonProps) {
  return (
    <Stack>
      {new Array(count).fill(true).map((_, i) => <Fragment key={i}>{skeleton}</Fragment>)}
    </Stack>
  );
}
