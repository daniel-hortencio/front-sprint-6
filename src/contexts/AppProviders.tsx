import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Auth/provider';

export const AppProviders: React.FC = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);
