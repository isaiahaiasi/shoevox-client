import { useContext } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Dashboard from './Dashboard';
import LogoutButton from './LogoutButton';
import Nav from './Nav';
import NotFound from './NotFound';
import RoomPage from './RoomPage';
import UserFeed from './UserFeed';
import Welcome from './Welcome';

function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function LoggedInRoutes() {
  return (
    <>
      <Nav />
      <LogoutButton />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />,
        <Route path="/dashboard" element={<Dashboard />} />,
        <Route path="/r/:roomid" element={<RoomPage />} />,
        <Route path="/u/:userid" element={<UserFeed />} />,
        <Route path="*" element={<NotFound />} />,
      </Routes>
    </>
  );
}

function FooterSpacer() {
  return <div style={{ height: 100 }} />;
}

function App() {
  const [user] = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <BrowserRouter>
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      <FooterSpacer />
    </BrowserRouter>
  );
}

export default App;
