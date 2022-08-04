import { Link } from 'react-router-dom';
import Button from './primitives/Button';
import Container from './primitives/Container';

export default function Nav() {
  return (
    <Container>
      <Button>
        <Link to="/dashboard">Dashboard</Link>
      </Button>
    </Container >
  );
}
