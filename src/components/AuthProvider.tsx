import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import {
  createContext, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { getCurrentUser } from '../utils/oauthUtils';
import Typography from './primitives/Typography';

interface Props {
  children: React.ReactNode;
}

type ContextType = [Dto['User'] | null, Dispatch<SetStateAction<Dto['User'] | null>> | null];

export const AuthContext = createContext<ContextType>([null, null]);

export default function AuthProvider({ children }: Props) {
  // Avoiding destructuring so I'm not passing a "new" array as prop
  const authState = useState<Dto['User'] | null>(null);

  // TODO: probably want to replace with rq?
  useEffect(() => {
    (async () => {
      const [currentUser, setCurrentUser] = authState;
      if (currentUser) return;

      const user = await getCurrentUser();

      setCurrentUser(user);
    })();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      <div>
        <Typography.Caption>
          {authState[0] ? `Logged in as ${authState[0].username}.` : 'Not logged in.'}
        </Typography.Caption>
      </div>
      {children}
    </AuthContext.Provider>
  );
}
