import { useParams } from 'react-router-dom';
import { useQueryOperation } from '../../hooks/useFetch';
import { getTimestampText } from '../../utils/dateUtils';
import NestedNavTabs from '../NestedNavTabs';
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

  const timestampText = data?.data.createdAt ? getTimestampText(data.data.createdAt) : '???';

  return (
    <Container>
      <Typography.Header level={1}>
        {data?.data.username ?? <Skeleton variant="text" />}
      </Typography.Header>
      <Typography.Caption>
        Joined {timestampText}
      </Typography.Caption>
      { /* spacer */}
      <div className="h-5" />

      <NestedNavTabs tabs={[
        { to: '', text: 'Rooms' },
        { to: 'likes', text: 'Liked' },
        { to: 'friends', text: 'Friends' },
      ]}
      />
    </Container>
  );
}
