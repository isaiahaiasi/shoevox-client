import GitHubLogin from './GithubLogin';
import GoogleLogin from './GoogleLogin';
import { Typography } from './Primitives';

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <header className="p-4">
        <Typography.Header>
          Welcome to
          {' '}
          <span>ShoeVox</span>
        </Typography.Header>
      </header>

      <div className="flex gap-2">
        <GoogleLogin />
        <GitHubLogin />
      </div>
    </div>
  );
}
