import { useCallback, useEffect, useRef } from 'react';
import useLoadScript from '../../hooks/useLoadScript';

interface UseGoogleLoginParams {
  onSuccess?: (res: any) => void;
  onFailure?: (res: any) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const googleClientScriptSrc = 'https://accounts.google.com/gsi/client';
const gapiScriptSrc = 'https://apis.google.com/js/platform.js?onload=init';

export default function useGoogleLogin({
  onSuccess = () => {},
  onFailure = () => {},
}:UseGoogleLoginParams) {
  const clientRef = useRef<any>();
  const isClientLoaded = useLoadScript(googleClientScriptSrc);
  const isGapiLoaded = useLoadScript(gapiScriptSrc);

  const googleScriptsLoaded = isClientLoaded && isGapiLoaded;

  const initCallback = (res: any) => {
    console.log('[google id init result]', res);
  };

  useEffect(() => {
    if (!googleScriptsLoaded) {
      return;
    }

    (window as any).google?.accounts.id.initialize({
      client_id,
      callback: initCallback,
    });

    const { oauth2 } = (window as any).google.accounts;

    const client = oauth2.initTokenClient({
      client_id,
      scope: 'openid profile email',
      callback: (res: any) => {
        if (res.error) {
          onFailure(res);
        } else {
          onSuccess(res);
        }
      },
    });

    clientRef.current = client;
  }, [googleScriptsLoaded]);

  const loginImplicitFlow = useCallback(
    () => clientRef.current.requestAccessToken(),
    [],
  );

  return loginImplicitFlow;
}
