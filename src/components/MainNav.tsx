import useAuth from '../hooks/useAuth';
import LogoutButton from './LogoutButton';
import { Link } from './Primitives';

export default function MainNav() {
  const { user } = useAuth();

  return (
    <div className="flex justify-end items-baseline gap-5 px-2">
      <Link to="/new">New</Link>
      <Link to="/dashboard">Dashboard</Link>
      {user && (
        <>
          <Link to={`/u/${user.id}`}>{user.username}</Link>
          <LogoutButton />
        </>
      )}
    </div>
  );
}
