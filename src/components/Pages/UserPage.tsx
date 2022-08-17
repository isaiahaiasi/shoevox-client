import { Outlet, useParams } from 'react-router-dom';
import { useQueryOperation } from '../../hooks/useFetch';
import { getTimestampText } from '../../utils/dateUtils';
import { Container, Typography } from '../Primitives';
import Skeleton from '../Skeletons/Skeleton';

export default function UserPage() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error('Could not find userid in url path, which is required for UserFeed component!');
  }

  const requestData = {
    params: { userid },
    query: {},
    body: {},
  };

  const { data } = useQueryOperation('getUserById', requestData);

  const timestamp = data?.data.createdAt ? getTimestampText(data.data.createdAt) : null;

  return (
    <Container>
      <Typography.Header level={1}>
        {data?.data.username ?? <Skeleton variant="text" />}
      </Typography.Header>
      <Typography.Caption>
        Joined {timestamp ?? '???'}
      </Typography.Caption>
      { /* spacer */}
      <div className="h-5" />

      <Outlet />
    </Container>
  );
}
