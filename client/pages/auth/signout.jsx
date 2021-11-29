import { Box } from '@chakra-ui/react';
import { Router } from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

export default function SignOut() {
  const { doRequest } = useRequest({
    method: 'signout',
    body: {},
    onSuccess: () => Router.push('/auth/signin'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <Box>Signin you out...</Box>;
}
