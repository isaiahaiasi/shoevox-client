import { useContext } from 'react';
import { loginWithOauth } from '../utils/oauthUtils';
import { AuthContext } from './AuthProvider';
import { Button } from './Primitives';

export default function GitHubLogin() {
  const [user] = useContext(AuthContext);

  // TODO: "github button" styling
  return (
    <Button
      variant="contained"
      onClick={(e) => loginWithOauth(e, 'github')}
      disabled={!!user}
    >
      Login with GitHub
    </Button>
  );
}
