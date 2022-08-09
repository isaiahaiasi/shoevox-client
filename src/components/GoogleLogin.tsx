import { useContext } from 'react';
import { loginWithOauth } from '../utils/oauthUtils';
import { AuthContext } from './AuthProvider';
import { Button } from './primitives';

export default function GoogleLogin() {
  const [user] = useContext(AuthContext);

  // TODO: "google button" styling
  return (
    <Button
      variant="Outlined"
      onClick={(e) => loginWithOauth(e, 'google')}
      disabled={!!user}
    >
      Login with google
    </Button>
  );
}
