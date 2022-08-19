import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { getTimestampText } from '../utils/dateUtils';
import { UserLink } from './Links';
import { Container, Typography } from './Primitives';

interface Props {
  friend: Dto['Friend'];
}

export default function Friend({ friend }: Props) {
  return (
    <Container>
      <div className="font-bold"><UserLink user={friend.user} /></div>
      <Typography.Caption>
        Befriended {getTimestampText(friend.createdAt)}
      </Typography.Caption>
    </Container>
  );
}
