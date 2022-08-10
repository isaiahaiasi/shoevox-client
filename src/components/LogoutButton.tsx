import { logoutWithOauth } from '../utils/oauthUtils';
import { Button } from './primitives';

export default function LogoutButton() {
  return (
    <Button onClick={logoutWithOauth}>Logout</Button>
  );
}
