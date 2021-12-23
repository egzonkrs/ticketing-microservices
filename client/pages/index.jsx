import { Box, Stack, Heading, Flex, Text } from '@chakra-ui/react';
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
            {tickets != null ? (
              tickets.map((ticket) => (
                <ProductSimple ticket={ticket} key={ticket.id} />
              ))
            ) : (
              <Text textAlign={'center'}>
                Oops, we don't have any tickets now 😓
              </Text>
            )}
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
      </Flex>
    </Box>
  );
};

Home.getInitialProps = async (context, client, currentUser) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/tickets');
  return { tickets: data, currentUser };
  // return {};
};

export default Home;
