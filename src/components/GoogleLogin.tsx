import { useContext } from 'react';
import { loginWithOauth } from '../utils/oauthUtils';
import { AuthContext } from './AuthProvider';
import { Button } from './Primitives';

export default function GoogleLogin() {
  const [user] = useContext(AuthContext);

  // TODO: "google button" styling
  return (
    <Button
      variant="contained"
      onClick={(e) => loginWithOauth(e, 'google')}
      disabled={!!user}
    >
      Login with Google
    </Button>
  );
}
