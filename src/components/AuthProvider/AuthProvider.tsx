import {
  createContext, Dispatch, SetStateAction, useState,
} from 'react';

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<
[boolean, Dispatch<SetStateAction<boolean>> | null]
>([false, null]);

export default function AuthProvider({ children }: Props) {
  const authState = useState(false);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
