import { Container, Typography } from '../Primitives';
import Feed from './Feed';

interface Props {
  userId: string;
}

const limit = 10;

export default function DashboardFeed({ userId }: Props) {
  const reqData = {
    query: { limit: String(limit), rel: 'friends' },
    body: {},
    params: { userid: userId },
  };

  return (
    <Container>
      <Typography.Header level={1}>Your Dashboard</Typography.Header>
      {/* @ts-ignore */}
      <Feed reqData={reqData} operationId="getRoomsByUserId" render={render} />
    </Container>
  );
}
