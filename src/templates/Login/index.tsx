import { Box } from '@material-ui/core';

export const LoginTemplate: React.FC = ({ children }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {children}
    </Box>
  );
};
