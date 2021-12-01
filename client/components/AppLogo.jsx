import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function AppLogo() {
  const router = useRouter();
  return (
    <Box
      w={[130, 150, 170]}
      onClick={() => router.push('/')}
      cursor={'pointer'}
    >
      <img src="/ticketinglogo-blue.svg" alt="app-logo" />
    </Box>
  );
}

export default AppLogo;
