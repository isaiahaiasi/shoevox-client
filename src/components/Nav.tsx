import { Link } from 'react-router-dom';
import { Button, Container } from './primitives';

export default function Nav() {
  return (
    <Container>
      <Button>
        <Link to="/dashboard">Dashboard</Link>
      </Button>
    </Container>
  );
}
