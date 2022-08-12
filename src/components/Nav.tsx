import LogoutButton from './LogoutButton';
import { Link } from './Primitives';

export default function Nav() {
  return (
    <div className="flex justify-end items-baseline gap-5 px-2">
      <Link to="/dashboard">Dashboard</Link>
      <LogoutButton />
    </div>
  );
}
