import { Box, Button, Text, Flex } from '@chakra-ui/react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    request: 'Orders',
    method: 'create',
    body: { ticketId: ticket.id },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <Box minH={'82vh'}>
      <Flex
        minH={'83vh'}
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
      >
        <Text fontSize={'3xl'} fontWeight={'bold'}>
          {ticket.title}
        </Text>
        <Text fontWeight={'semibold'} fontSize={'2xl'} my={'10px'}>
          ${title.price}
        </Text>
        {errors.errors != null && (
          <>
            <Box
              bg={'red.300'}
              my={'1rem'}
              rounded={'lg'}
              px={'12px'}
              py={'5px'}
            >
              <Text color={'red.600'} fontWeight={'bold'} textColor={'red.800'}>
                {errors.errors['ticket']}
              </Text>
            </Box>
          </>
        )}
        <Button
          marginTop={2}
          type="submit"
          bg={'blue.800'}
          color={'white'}
          _hover={{
            bg: 'blue.700',
          }}
          onClick={() => doRequest()}
        >
          Purchase
        </Button>
      </Flex>
    </Box>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
  // let ticket = { id: 'asdasdasd', title: 'COTA Grand Prix', price: 22 };
  // return { ticket: ticket };
};

export default TicketShow;
