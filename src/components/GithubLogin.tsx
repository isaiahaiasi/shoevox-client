import useAuth from '../hooks/useAuth';
import { Button } from './Primitives';

export default function GitHubLogin() {
  const { user, login } = useAuth();

  // TODO: "github button" styling
  return (
    <Button
      variant="contained"
      onClick={(e) => login(e, 'github')}
      disabled={!!user}
    >
      Login with GitHub
    </Button>
  );
}
