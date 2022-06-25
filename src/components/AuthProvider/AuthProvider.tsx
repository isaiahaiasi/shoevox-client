import {
  createContext, Dispatch, SetStateAction, useState,
} from 'react';

interface Props {
  children: React.ReactNode;
}

type ContextType = [boolean, Dispatch<SetStateAction<boolean>> | null];

export const AuthContext = createContext<ContextType>([false, null]);

export default function AuthProvider({ children }: Props) {
  const authState = useState(false);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
