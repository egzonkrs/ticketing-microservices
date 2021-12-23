import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/useRequest';

const OrderShow = ({ order, currentUser }) => {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    request: 'Payments',
    method: 'create',
    body: { orderId: order.id },
    onSuccess: () => router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const milisecondsLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(milisecondsLeft / 60000)); // mins = 60000, sekonda = 1000
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return (
      <Box minH={'82vh'}>
        <Flex
          minH={'83vh'}
          flexDirection={'column'}
          align={'center'}
          justify={'center'}
        >
          <Box
            bg={'red.200'}
            my={'1rem'}
            rounded={'lg'}
            px={'12px'}
            py={'10px'}
          >
            <Text fontSize={'xl'} fontWeight={'bold'} textColor={'red.800'}>
              Sorry but order expired !
            </Text>
          </Box>
          <Button
            marginTop={2}
            type="submit"
            bg={'blue.800'}
            color={'white'}
            _hover={{
              bg: 'blue.700',
            }}
            onClick={() => router.push(`/tickets/${order.ticket.id}`)}
          >
            Go back to ticket
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Box minH={'82vh'}>
      <Flex
        minH={'83vh'}
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
      >
        <Box bg={'blue.800'} my={'1rem'} rounded={'lg'} px={'12px'} py={'10px'}>
          <Text fontSize={'xl'} fontWeight={'bold'} textColor={'white'}>
            Time left to pay: {timeLeft} minutes
          </Text>
        </Box>
        {/* {JSON.stringify(errors)} */}
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51K8VkiB1T2BkgrQVw69lV3t9vGZV5VeNoLH7FLagkMxfmwcoxKhrEPYMAZnFk38wKQ0PvIPpBXSIhi2Aie1Ka6hi003yTEBsMf"
          amount={order.ticket.price * 100}
          email={currentUser.email}
          description="Ticketing | Payment" // the pop-in header subtitle
          image="https://i.imgur.com/Iuj9Mf7.png"
          shippingAddress
        />
      </Flex>
    </Box>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
  // const expiration = new Date();
  // expiration.setSeconds(expiration.getSeconds() + 1 * 60);
  // let ord = {
  //   id: 'asdq3424',
  //   expiresAt: expiration,
  // };
  // return { order: ord };
};

export default OrderShow;
