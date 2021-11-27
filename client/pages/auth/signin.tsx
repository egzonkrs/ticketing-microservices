import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
} from '@chakra-ui/react';

import Router from 'next/router';
import useRequest from '../../hooks/useRequest';
import { useState } from 'react';

interface Props {
  color: string;
  host: string;
}

export default function SignIn({ color, host }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { doRequest, errors } = useRequest({
    method: 'signin',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event: React.SyntheticEvent) => {
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
          {color} - - - - - - {host}
          <Heading fontSize={'2xl'} color={'black'}>
            Sign in to your account
          </Heading>
          <Text fontSize={'base'} color={'gray.800'}>
            and start buying tickets 🤙
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={'blue.800'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.700',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
