import React from 'react';
import { Box } from '@chakra-ui/react';

function AppLogo() {
  return (
    <Box w={[130, 150, 170, 185, 200]}>
      <img src="/ticketinglogo-red.svg" alt="app-logo" />
    </Box>
  );
}

export default AppLogo;
