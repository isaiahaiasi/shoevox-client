import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Dashboard from './Pages/Dashboard';
import MainNav from './MainNav';
import NotFound from './NotFound';
import RoomPage from './Pages/RoomPage';
import UserFeed from './Feed/UserFeed';
import Welcome from './Welcome';
import LikeFeed from './Feed/LikeFeed';
import UserPage from './Pages/UserPage';
import CommentFeed from './Feed/CommentFeed';
import UserLikeFeed from './Feed/UserLikeFeed';
import AllRoomsPage from './Pages/AllRoomsPage';

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
      <MainNav />
      <Routes>
        <Route path="/" element={<Navigate to={destination} />} />

        <Route path="/new" element={<AllRoomsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/r/:roomid" element={<RoomPage />}>
          <Route path="" element={<CommentFeed />} />
          <Route path="likes" element={<LikeFeed />} />
        </Route>

        <Route path="/u/:userid" element={<UserPage />}>
          <Route path="" element={<UserFeed />} />
          <Route path="likes" element={<UserLikeFeed />} />
        </Route>

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
