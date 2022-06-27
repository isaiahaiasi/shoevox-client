import { useEffect, useState } from 'react';

export default function useLoadScript(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const gScriptElm = document.createElement('script');
    gScriptElm.src = src;
    gScriptElm.async = true;
    gScriptElm.defer = true;
    gScriptElm.onload = () => {
      setIsLoaded(true);
    };
    gScriptElm.onerror = () => {
      setIsLoaded(false);
    };

    document.body.appendChild(gScriptElm);

    return () => {
      document.body.removeChild(gScriptElm);
      setIsLoaded(false);
    };
  }, []);

  return isLoaded;
}
