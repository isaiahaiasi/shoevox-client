import { logoutWithOauth } from '../utils/oauthUtils';
import { Button } from './Primitives';

export default function LogoutButton() {
  return (
    <Button onClick={logoutWithOauth}>
      Logout
    </Button>
  );
}
