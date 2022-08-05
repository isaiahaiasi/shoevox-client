import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import useGoogleLogin from '../hooks/useGoogleLogin';
import { Button } from './primitives';

// TODO: This should probably be a custom hook wrapping React-Query
async function putUser(idToken: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/users?provider=google`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${idToken}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    // API definition expects a custom username to be sent,
    // however, this has not yet been implemented on either the client or the server.
    body: JSON.stringify({
      username: 'TEMP TEMP TEMP',
    }),
  }).then((apiRes) => apiRes.json());
}

export default function GoogleLogin() {
  const [user, setUser] = useContext(AuthContext);

  const onSuccess = async (res: any) => {
    console.log('[credential res]', res);

    const apiJson = await putUser(res.credential);

    console.log('apiJson', apiJson);

    setUser!({
      token: res.credential,
      username: apiJson.username,
      provider: 'google',
    });
  };

  const onFailure = (res: any) => {
    // TODO: redirect to error page? Idk
    console.log('[failure]', res);
  };

  const loginFn = useGoogleLogin({ onSuccess, onFailure });

  // TODO: Proper button styling
  return (
    <Button
      variant="Outlined"
      onClick={() => loginFn()}
      disabled={!!user}
    >
      Login with google
    </Button>
  );
}
