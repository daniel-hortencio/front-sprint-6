import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './context';

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const history = useHistory();

  const handleLogin = (login: string, pass: string) => {
    if (login === 'tester@gmail.com' && pass === '123') {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
