import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { getCurrentUser, getLoginUrl, LOGOUT_URL } from '../utils/fetchUtils';
import { Container, Typography } from './Primitives';

interface Props {
  children: React.ReactNode;
}

async function login(e: React.UIEvent, provider: string) {
  e.preventDefault();
  window.open(getLoginUrl(provider), '_self');
}

async function logout(e: React.UIEvent) {
  e.preventDefault();
  window.open(LOGOUT_URL, '_self');
}

interface ContextType {
  login: typeof login;
  logout: typeof logout;
  user: Dto['User'] | null;
}

export const AuthContext = createContext<ContextType>({
  login,
  logout,
  user: null,
});

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<Dto['User'] | null>(null);

  // TODO: probably want to replace with rq?
  useEffect(() => {
    if (user) return;

    getCurrentUser().then(setUser);
  }, [user, setUser]);

  const authData = useMemo(() => ({ user, logout, login }), [user]);

  return (
    <AuthContext.Provider value={authData}>
      <Container>
        <Typography.Caption>
          <div className="text-center">
            {user ? `Logged in as ${user.username}.` : 'Not logged in.'}
          </div>
        </Typography.Caption>
      </Container>
      {children}
    </AuthContext.Provider>
  );
}
