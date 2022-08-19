import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { ApiRequest } from '@isaiahaiasi/voxelatlas-spec/public/types';
import { ReactNode, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../ErrorAlert';
import Friend from '../Friend';
import { FeedSkeleton } from '../Skeletons';
import Skeleton from '../Skeletons/Skeleton';
import Feed from './Feed';

interface PartialFeedRenderer {
  success: (data: Dto['Friend']) => React.ReactNode;
  error?: () => ReactNode;
  loading?: () => ReactNode;
}

interface Props {
  query?: ApiRequest<'getFriends'>['query'];
  render?: PartialFeedRenderer;
}

const LIMIT = 5;

const defaultRenderer = {
  error: () => <ErrorAlert />,
  loading: () => <FeedSkeleton count={LIMIT} skeleton={<Skeleton variant="text" />} />,
  success: (data: Dto['Friend']) => <Friend friend={data} />,
};

const defaultQuery: ApiRequest<'getFriends'>['query'] = {
  status: 'ACCEPTED',
};

// By default, renders a simple list of ACCEPTED friend requests for a user.
export default function FriendFeed({ query = defaultQuery, render }: Props) {
  const { userid } = useParams();

  if (!userid) {
    throw new Error('Could not find userid in url path, which is required for FriendFeed!');
  }

  const reqData = useMemo(() => ({
    params: { userid },
    query: { limit: String(LIMIT), ...query },
    body: {},
  }), [userid, query]);

  return (
    <Feed operationId="getFriends" reqData={reqData} render={{ ...defaultRenderer, ...render }} />
  );
}
