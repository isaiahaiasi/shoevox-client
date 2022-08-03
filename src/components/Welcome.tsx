import { Typography } from "@mui/material";

export default function Welcome() {
  return (
    <div className="fancy-bg">
      <header>
        <Typography variant="h1">
          Welcome to
          {' '}
          <span className="fancy-text">ShoeVox</span>
        </Typography>
      </header>
      <div className="cool-example" />
    </div>
  );
}
