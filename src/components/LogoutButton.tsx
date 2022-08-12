import useAuth from '../hooks/useAuth';
import { Button } from './Primitives';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button onClick={logout}>
      Logout
    </Button>
  );
}
