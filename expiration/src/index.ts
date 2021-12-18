import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('[Tickets] - NATS_CLIENT_ID must be defined!');
  } else if (!process.env.NATS_URL) {
    throw new Error('[Tickets] - NATS_URL must be defined!');
  } else if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('[Tickets] - NATS_CLUSTER_ID must be defined!');
  }

  try {
    /*-----------------------------------------------------------------------*/
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    /* 
      Keto lines poshte jane tu listen per interrupt ose terminate 
      signals. Interrupt 14-14 Graceful client shutdown 
    */
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    /* ----- Listeners ----- */
    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
  }
};

start();
