import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <Container>
      <Button variant="contained">
        <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link>
      </Button>
    </Container>
  );
}
