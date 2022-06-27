import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import useGoogleLogin from './useGoogleLogin';

export default function GoogleAuth() {
  const [user, setUser] = useContext(AuthContext);

  const onSuccess = async (res: any) => {
    // TODO: send token to API if it's a "Sign up"

    // TODO: extract this fetch logic?
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: new Headers({
        Authorization: `Bearer ${res.access_token}`,
      }),
    }).then((r) => r.json());

    setUser!({
      accessToken: res.access_token,
      username: userInfo.name,
    });

    console.log('[success]', res);
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
