import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <div role="doc-subtitle">You lost there?</div>
      <p>
        Click
        {' '}
        <Link to="/">here</Link>
        {' '}
        to go back home.
      </p>
    </div>
  );
}
