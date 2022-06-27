import useGoogleLogin from './useGoogleLogin';

export default function GoogleAuth() {
  const onSuccess = (res: any) => {
    // TODO: send token to API
    console.log('[success]', res);
  };

  const onFailure = (res: any) => {
    // TODO: redirect to error page? Idk
    console.log('[failure]', res);
  };

  const loginFn = useGoogleLogin({ onSuccess, onFailure });

  // TODO: Proper button styling
  return <button type="button" onClick={() => loginFn()}>Login with google</button>;
}
