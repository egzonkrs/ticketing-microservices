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
  // FormHelperText,
} from '@chakra-ui/react';
// import axios from 'axios';
import { useState } from 'react';
import agent from '../../agent';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [errors, setErrors] = useState<any>([]);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const creds = {
        email,
        password,
      };

      const response = await agent.Account.signup(creds);
      console.log(response);
      // const response = await axios.post('/api/users/signup', {
      //   email,
      //   password,
      // });
    } catch (error: any) {
      console.log(error.response.data.errors);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'} color={'black'}>
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
            <Stack spacing={10}>
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <FormHelperText color={'red.600'} fontWeight={'semibold'}>
                  Email is in use
                </FormHelperText> */}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  isInvalid
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
