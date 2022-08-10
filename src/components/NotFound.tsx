import { Link, Container, Typography } from './primitives';

export default function NotFound() {
  return (
    <Container>
      <Typography.Header>404 Not Found</Typography.Header>
      <Typography.Body>You lost there?</Typography.Body>
      <p>
        Click
        {' '}
        <Link to="/">here</Link>
        {' '}
        to go back home.
      </p>
    </Container>
  );
}
