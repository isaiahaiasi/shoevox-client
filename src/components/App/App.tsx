import { useContext } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Dashboard from '../Dashboard';
import NotFound from '../NotFound';
import Welcome from '../Welcome';
import './App.scss';

function App() {
  const [authStatus] = useContext(AuthContext);

  const WelcomeRoute = !authStatus ? <Welcome /> : <Navigate to="/dashboard" />;
  const DashboardRoute = authStatus ? <Dashboard /> : <Navigate to="/" />;

  return (
    <BrowserRouter>
      <div>
        Auth status: {authStatus.toString()}
      </div>
      <Routes>
        <Route path="/" element={WelcomeRoute} />
        <Route path="/dashboard" element={DashboardRoute} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
