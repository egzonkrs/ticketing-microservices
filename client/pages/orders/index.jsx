import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const OrderIndex = ({ orders }) => {
  return (
    <Box minH={'82vh'}>
      <Flex minH={'83vh'} flexDirection={'column'} align={'center'}>
        <Table variant="simple" border={'2rem'}>
          <Thead>
            <Tr>
              <Th fontSize={'lg'} fontWeight={'bold'}>
                Title
              </Th>
              <Th fontSize={'lg'} fontWeight={'bold'}>
                Status
              </Th>
              <Th isNumeric fontSize={'lg'} fontWeight={'bold'}>
                Price
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders !== null && orders !== undefined ? (
              <>
                {orders.map((order) => (
                  <Tr key={order.id}>
                    <Td fontWeight={'semibold'}>{order.title}</Td>
                    <Td fontWeight={'semibold'}>{order.status}</Td>
                    <Td fontWeight={'semibold'} isNumeric>
                      ${order.price}
                    </Td>
                  </Tr>
                ))}
              </>
            ) : (
              <>
                <Tr>
                  <Td>
                    You don't have any orders, go sign up and make an order! 😋
                  </Td>
                </Tr>
              </>
            )}
          </Tbody>
        </Table>
      </Flex>
    </Box>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = client.get('/api/orders');
  return { orders: data };
  // return {};
};

export default OrderIndex;
