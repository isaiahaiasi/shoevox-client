import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import AuthProvider from './components/AuthProvider/AuthProvider';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
