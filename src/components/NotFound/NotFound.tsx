import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container>
      <Typography variant="h1">404 Not Found</Typography>
      <Typography role="doc-subtitle">You lost there?</Typography>
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
