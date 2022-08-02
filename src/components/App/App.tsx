import { Box } from '@mui/material';
import { useContext } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes
} from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Dashboard from '../Dashboard';
import GoogleLogin from '../GoogleLogin';
import Nav from '../Nav';
import NotFound from '../NotFound';
import RoomPage from '../RoomPage';
import UserFeed from '../UserFeed/UserFeed';
import Welcome from '../Welcome';

const LoggedOutRoutes = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

const LoggedInRoutes = () => (
  <>
    <Nav />
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />,
      <Route path="/dashboard" element={<Dashboard />} />,
      <Route path="/r/:roomid" element={<RoomPage />} />,
      <Route path="/u/:userid" element={<UserFeed />} />,
      <Route path="*" element={<NotFound />} />,
    </Routes>
  </>
);

const FooterSpacer = () => <Box sx={{ height: 100 }} />;

function App() {
  const [user] = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <BrowserRouter>
      <GoogleLogin />
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      <FooterSpacer />
    </BrowserRouter>
  );
}

export default App;
