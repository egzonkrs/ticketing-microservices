import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
} from '@chakra-ui/react';

import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import useRequest from '../../hooks/useRequest';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    method: 'signup',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
    // Router.push('/');
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} minW={'sm'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'} color={'black'}>
            Create your account
          </Heading>
          <Text fontSize={'base'} color={'gray.800'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'xl'}
          p={8}
        >
          <form onSubmit={onSubmit} noValidate>
            <Stack spacing={1}>
              <FormControl id="email" minHeight={'93px'}>
                {/* {JSON.stringify(errors)} */}
                {/* {JSON.stringify(errors.length)} */}
                <FormLabel>Email Address</FormLabel>
                <Input
                  isInvalid={
                    errors.errors != null && errors.errors['email']
                      ? true
                      : false
                  }
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.errors != null && (
                  <>
                    <FormHelperText
                      marginTop={0.5}
                      color={'red.600'}
                      fontWeight={'bold'}
                    >
                      {errors.errors['email']}
                    </FormHelperText>
                  </>
                )}
              </FormControl>
              <FormControl id="password" minHeight={'93px'}>
                <FormLabel>Password</FormLabel>
                <Input
                  isInvalid={
                    errors.errors != null && errors.errors['password']
                      ? true
                      : false
                  }
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.errors != null && (
                  <>
                    <FormHelperText
                      marginTop={0.5}
                      color={'red.600'}
                      fontWeight={'bold'}
                    >
                      {errors.errors['password']}
                    </FormHelperText>
                  </>
                )}
              </FormControl>
              <Stack spacing={1}>
                <Button
                  marginTop={2}
                  type="submit"
                  bg={'blue.800'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.700',
                  }}
                >
                  Sign up
                </Button>
                <Text textAlign={'center'} py={2}>
                  or
                </Text>
                <hr />
                <Link
                  color={'blue.500'}
                  onClick={() => router.push('/auth/signin')}
                  textAlign={'center'}
                  paddingTop={2}
                  fontWeight={'semibold'}
                >
                  Sign in here
                </Link>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
