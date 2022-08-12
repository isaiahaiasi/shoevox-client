import useAuth from '../hooks/useAuth';
import { Button } from './Primitives';

export default function GoogleLogin() {
  const { user, login } = useAuth();

  // TODO: "google button" styling
  return (
    <Button
      variant="contained"
      onClick={(e) => login(e, 'google')}
      disabled={!!user}
    >
      Login with Google
    </Button>
  );
}
