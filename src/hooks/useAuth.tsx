import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth/context';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useLoading must be used within a LoadingProvider');

  const { isAuthenticated, handleLogin, handleLogout } = context;

  return { isAuthenticated, handleLogin, handleLogout };
};
