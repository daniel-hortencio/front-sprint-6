import { createContext } from 'react';

interface IAuthProvider {
  isAuthenticated: boolean;
  handleLogin: (login: string, pass: string) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as IAuthProvider);
