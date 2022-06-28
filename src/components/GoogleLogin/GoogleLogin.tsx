import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import useGoogleLogin from './useGoogleLogin';

// TODO: This should probably be a custom hook wrapping React-Query
// TODO: Probably want to send username in the body?
// TODO: Not sure how I want to format this endpoint, tbh
// TODO: I need a way to share API Spec between client & server, prob make it an npm package...
async function putUser(idToken: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/users?provider=google`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${idToken}`,
    },
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
    <button
      type="button"
      onClick={() => loginFn()}
      disabled={!!user}
    >
      Login with google
    </button>
  );
}
