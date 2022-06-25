import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

export default function Welcome() {
  const [,setAuthStatus] = useContext(AuthContext);

  function handleClick() {
    if (setAuthStatus) {
      setAuthStatus(true);
    }
  }

  return (
    <div className="fancy-bg">
      <header>
        <h1>
          Welcome to
          {' '}
          <span className="fancy-text">ShoeVox</span>
        </h1>
      </header>
      <div className="login-group">
        <button type="button" onClick={handleClick}>Log in</button>
        <button type="button" onClick={handleClick}>Sign up</button>
      </div>
      <div className="cool-example" />
    </div>
  );
}
