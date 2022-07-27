import { useContext } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Dashboard from '../Dashboard';
import GoogleLogin from '../GoogleLogin';
import NotFound from '../NotFound';
import RoomPage from '../RoomPage';
import Welcome from '../Welcome';
import './App.scss';

function App() {
  const [user] = useContext(AuthContext);
  const authStatus = !!user;

  const LoggedOutRoutes = (
    <>
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>
  );

  const loggedInRoutes = (
    <>
      <Route path="/" element={<Navigate to="/dashboard" />} />,
      <Route path="/dashboard" element={<Dashboard />} />,
      <Route path="/r/:roomid" element={<RoomPage />} />,
      <Route path="*" element={<NotFound />} />,
    </>
  );

  return (
    <BrowserRouter>
      <GoogleLogin />
      <Routes>
        {authStatus ? loggedInRoutes : LoggedOutRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
