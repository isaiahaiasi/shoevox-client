import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Link } from '../primitives';

interface UserLinkProps {
  user: Dto['User'];
}

// I like the idea of making this fancier later--maybe a hover effect with profile pic?
export default function UserLink({ user }: UserLinkProps) {
  const { id, username } = user;

  return <Link to={`/u/${id}`}>{username}</Link>;
}
