import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { size, media } from '../../constants/material';
import Navigation from '../../components/Navigation';

export const DashboardTemplate: React.FC = ({ children }) => {
  const mediaMD = useMediaQuery(media.md);

  return (
    <Box maxWidth={size.lg} margin="0 auto">
      <Box display={mediaMD ? 'flex' : 'block'}>
        <Box width={mediaMD ? '20rem' : '100%'} mr={mediaMD ? 2 : 0}>
          <Navigation />
        </Box>
        <Box flex="auto" px={2} pt={2}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
