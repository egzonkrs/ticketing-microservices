import { Box } from '@chakra-ui/react';
import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

export default function SignOut() {
  const router = useRouter();
  const { doRequest } = useRequest({
    request: 'Account',
    method: 'signout',
    body: {},
    onSuccess: () => router.push('/auth/signin'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <Box>Signin you out...</Box>;
}
