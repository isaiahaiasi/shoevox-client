import GitHubLogin from './GithubLogin';
import GoogleLogin from './GoogleLogin';
import Typography from './primitives/Typography';

export default function Welcome() {
  return (
    <div>
      <header>
        <Typography.Header>
          Welcome to
          {' '}
          <span>ShoeVox</span>
        </Typography.Header>
      </header>
      <GoogleLogin />
      <GitHubLogin />
    </div>
  );
}
