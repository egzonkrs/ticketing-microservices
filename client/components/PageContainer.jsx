import { Box, useColorModeValue } from '@chakra-ui/react';

export default function PageContainer({ children }) {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')} px={{ lg: 40 }}>
      {children}
    </Box>
  );
}
