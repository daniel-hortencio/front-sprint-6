import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Routes from './routes';
import { AppProviders } from './contexts/AppProviders';

const App: React.FC = () => (
  <AppProviders>
    <CssBaseline />
    <Routes />
  </AppProviders>
);

export default App;
