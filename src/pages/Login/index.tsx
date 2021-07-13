import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Box } from '@material-ui/core';
import { LoginTemplate } from '../../templates/Login';
import styles from './styles.module.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    history.push('/marcas');
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <h2>Carango<span>Bom.</span></h2>
        <p>Promovendo <br/> transformação digital <br/> no segmento <br/> <span>automotivo</span></p>
      </div>
      <LoginTemplate >
        <form onSubmit={handleSubmit} >
          <h2>Faça seu login.</h2>
          <Box mb={2} className={styles.box}>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2} >
            <TextField
              id="password"
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          <Box width="100%">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disableElevation
              disabled={!email || !password}
            >
              Logar
            </Button>
          </Box>
        </form>
      </LoginTemplate>
    </div>
  );
};

export default Login;
