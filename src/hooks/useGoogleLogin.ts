import { useEffect } from 'react';
import useLoadScript from './useLoadScript';

interface UseGoogleLoginParams {
  onSuccess?: (res: any) => void;
  onFailure?: (res: any) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const googleClientScriptSrc = 'https://accounts.google.com/gsi/client';
const gapiScriptSrc = 'https://apis.google.com/js/platform.js?onload=init';

export default function useGoogleLogin({
  onSuccess = () => { },
  onFailure = () => { },
}: UseGoogleLoginParams) {
  // const clientRef = useRef<any>();
  const isClientLoaded = useLoadScript(googleClientScriptSrc);
  const isGapiLoaded = useLoadScript(gapiScriptSrc);

  const googleScriptsLoaded = isClientLoaded && isGapiLoaded;

  const handleCredentialResponse = (res: any) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { credential, select_by } = res;

    if (!credential || !select_by) {
      onFailure(res);
    } else {
      console.log('[google id init result]', { credential, select_by });
      onSuccess({ credential, select_by });
    }
  };

  useEffect(() => {
    if (!googleScriptsLoaded) {
      return;
    }

    (window as any).google?.accounts.id.initialize({
      client_id,
      callback: handleCredentialResponse,
      ux_mode: 'redirect',
      itp_support: true,
    });

    // const { oauth2 } = (window as any).google.accounts;

    // Want `initTokenClient` if using implicit flow
    // const client = oauth2.initCodeClient({
    //   client_id,
    //   scope: 'openid profile email',
    //   callback: (res: any) => {
    //     if (res.error) {
    //       onFailure(res);
    //     } else {
    //       onSuccess(res);
    //     }
    //   },
    // });

    // clientRef.current = client;
  }, [googleScriptsLoaded]);

  // want requestAccessToken() if using implicit flow
  // const loginAuthCodeFlow = useCallback(
  //   () => clientRef.current.requestCode(),
  //   [clientRef.current],
  // );

  // console.log('gclient', clientRef.current);

  return (window as any).google?.accounts.id.prompt;
}
