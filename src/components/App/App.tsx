import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import Dashboard from '../Dashboard';
import Welcome from '../Welcome';
import './App.scss';

function App() {
  const [authStatus] = useContext(AuthContext);

  return authStatus ? <Dashboard /> : <Welcome />;
}

export default App;
