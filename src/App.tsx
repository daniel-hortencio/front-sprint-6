import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Modal from 'react-modal';
import Routes from './routes';
import { AppProviders } from './contexts/AppProviders';

Modal.setAppElement('#root');

const App: React.FC = () => (
  <AppProviders>
    <CssBaseline />
    <Routes />
  </AppProviders>
);

export default App;
