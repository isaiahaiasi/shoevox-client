import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Dashboard from './Feeds/Dashboard';
import Nav from './Nav';
import NotFound from './NotFound';
import RoomPage from './RoomPage';
import UserFeed from './Feeds/UserFeed';
import Welcome from './Welcome';
import LikeFeed from './Feeds/LikeFeed';

function LoggedOutRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/" state={{ from: location }} replace />} />
    </Routes>
  );
}

function LoggedInRoutes() {
  // When a page is refreshed, the user is retrieved asynchronously,
  // so this allows the user to be returned to the page they were previously on.
  const location = useLocation();
  const destination = (location.state as any)?.from ?? '/dashboard';

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to={destination} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/r/:roomid" element={<RoomPage />}>
          <Route path="likes" element={<LikeFeed />} />
        </Route>
        <Route path="/u/:userid" element={<UserFeed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function RouteSwitch() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
}
