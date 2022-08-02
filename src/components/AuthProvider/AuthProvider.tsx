import { Box, Typography } from '@mui/material';
import {
  createContext, Dispatch, SetStateAction, useState,
} from 'react';

type Provider = 'google';

export interface User {
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
      <Box>
        <Typography variant="caption">
          {authState[0] ? `Logged in as ${authState[0].username}.` : 'Not logged in.'}
        </Typography>
      </Box>
      {children}
    </AuthContext.Provider>
  );
}
