import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const IMAGE = 'https://i.imgur.com/Iuj9Mf7.png';

export default function ProductSimple({ ticket }) {
  const router = useRouter();
  function truncate(str, len) {
    if (str) {
      if (str.length < 16) return str;
      return str.length > (len ? len : 20)
        ? str.substring(0, len ? len : 20) + '...'
        : str;
    }
  }
  return (
    <Box
      role={'group'}
      m={'1rem'}
      p={6}
      maxW={'230px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
    >
      <Box
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(${IMAGE})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}
      >
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={IMAGE}
        />
      </Box>
      <Stack pt={10} align={'center'}>
        <Heading
          cursor={'pointer'}
          fontSize={'1xl'}
          fontFamily={'body'}
          fontWeight={600}
        >
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>{truncate(ticket.title, 20)}</a>
          </Link>
        </Heading>
        <Stack direction={'row'} mt={'2px'} align={'center'}>
          <Text fontWeight={800} fontSize={'lg'}>
            ${ticket.price}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
