import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Stack,
  Heading,
  Flex,
} from '@chakra-ui/react';
import ProductSimple from '../components/ProductSimple';

const Home = ({ tickets }) => {
  return (
    <Box height={'80vh'} px={{ base: '2rem' }}>
      <Stack align={'center'}>
        <Heading fontSize={'2xl'} color={'black'} fontWeight={'bold'}>
          Tickets
        </Heading>
      </Stack>
      <Flex justifyItems={'center'} alignItems={'center'}>
        <Stack align={'center'}>
          <Flex flexDirection={'row'} flexWrap={'wrap'} marginTop={'2rem'}>
            {tickets.map((ticket) => (
              <ProductSimple ticket={ticket} key={ticket.id} />
            ))}
          </Flex>
        </Stack>
        {/* <Table variant="simple" border={'2rem'}>
        <Thead>
          <Tr>
            <Th fontSize={'lg'} fontWeight={'bold'}>
              Title
            </Th>
            <Th isNumeric fontSize={'lg'} fontWeight={'bold'}>
              Price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tickets.map((ticket) => (
            <Tr key={ticket.id}>
              <Td>{ticket.title}</Td>
              <Td isNumeric>${ticket.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table> */}
        {/* {currentUser != null ? (
        <>
          <h1>You are signed in</h1>
          <span>{JSON.stringify(currentUser)}</span>
        </>
      ) : (
        <h1>you aree not signed in</h1>
      )} */}
      </Flex>
    </Box>
  );
};

Home.getInitialProps = async (context, client, currentUser) => {
  // const client = buildClient(context);
  const { data } = await client.get('/api/tickets');

  return { tickets: data, currentUser };
};

export default Home;
