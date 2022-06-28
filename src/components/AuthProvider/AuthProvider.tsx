import {
  createContext, Dispatch, SetStateAction, useState,
} from 'react';

type Provider = 'google';

interface User {
  token: string;
  username: string;
  provider: Provider;
}

interface Props {
  children: React.ReactNode;
}

type ContextType = [User | null, Dispatch<SetStateAction<User | null>> | null];

export const AuthContext = createContext<ContextType>([null, null]);

export default function AuthProvider({ children }: Props) {
  const authState = useState<User | null>(null);

  return (
    <AuthContext.Provider value={authState}>
      <div>
        {authState[0] ? `Logged in as ${authState[0].username}.` : 'Not logged in.'}
      </div>
      {children}
    </AuthContext.Provider>
  );
}
