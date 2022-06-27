import { useContext } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Dashboard from '../Dashboard';
import GoogleAuth from '../GoogleAuth';
import NotFound from '../NotFound';
import Welcome from '../Welcome';
import './App.scss';

function App() {
  const [user] = useContext(AuthContext);
  const authStatus = !!user;

  const WelcomeRoute = !authStatus ? <Welcome /> : <Navigate to="/dashboard" />;
  const DashboardRoute = authStatus ? <Dashboard /> : <Navigate to="/" />;

  return (
    <BrowserRouter>
      <GoogleAuth />
      <Routes>
        <Route path="/" element={WelcomeRoute} />
        <Route path="/dashboard" element={DashboardRoute} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
