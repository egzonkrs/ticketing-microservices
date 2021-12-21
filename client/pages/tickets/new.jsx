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
import useTicketsRequest from '../../hooks/useTicketsRequest';

export default function NewTicket({ color, host }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const { doRequest, errors } = useTicketsRequest({
    method: 'create',
    body: { title, price },
    onSuccess: (ticket) => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    // await doRequest();
    console.log(title, price);
    // Router.push('/');
  };

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
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
            Create a new ticket
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'xl'}
          p={8}
        >
          <form onSubmit={onSubmit} noValidate>
            <Stack spacing={1}>
              <FormControl id="title" minHeight={'93px'}>
                {/* {JSON.stringify(errors)} */}
                {/* {JSON.stringify(errors.length)} */}
                <FormLabel>Title</FormLabel>
                <Input
                  // isInvalid={
                  //   errors.errors != null && errors.errors['title']
                  //     ? true
                  //     : false
                  // }
                  type="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {/* {errors.errors != null && (
                  <>
                    <FormHelperText
                      marginTop={0.5}
                      color={'red.600'}
                      fontWeight={'bold'}
                    >
                      {errors.errors['title']}
                    </FormHelperText>
                  </>
                )} */}
              </FormControl>
              <FormControl id="price" minHeight={'93px'}>
                <FormLabel>Price</FormLabel>
                <Input
                  // isInvalid={
                  //   errors.errors != null && errors.errors['price']
                  //     ? true
                  //     : false
                  // }
                  type="number"
                  value={price}
                  onBlur={onBlur}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {/* {errors.errors != null && (
                  <>
                    <FormHelperText
                      marginTop={0.5}
                      color={'red.600'}
                      fontWeight={'bold'}
                    >
                      {errors.errors['price']}
                    </FormHelperText>
                  </>
                )} */}
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
                  Create Ticket
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
