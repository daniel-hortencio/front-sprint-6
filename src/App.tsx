import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Modal from 'react-modal';
import Routes from './routes';

Modal.setAppElement('#root');

const App: React.FC = () => (
  <>
    <CssBaseline />
    <Routes />
  </>
);

export default App;
