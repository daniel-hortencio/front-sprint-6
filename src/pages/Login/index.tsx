import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Box } from '@material-ui/core';
import { LoginTemplate } from '../../templates/Login';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    history.push('/marcas');
  };

  return (
    <LoginTemplate>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
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
  );
};

export default Login;
