import mongoose from 'mongoose';
import { app } from './app';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  const port = process.env.PORT || 3000;
  console.log('Starting...');
  if (!process.env.JWT_KEY) {
    throw new Error('[Tickets] - JWT_KEY must be defined!');
  } else if (!process.env.MONGO_URI) {
    throw new Error('[Tickets] - MONGO_URI must be defined!');
  } else if (!process.env.NATS_CLIENT_ID) {
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
    /*-----------------------------------------------------------------------*/
    /* Listeners */
    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();
    /* Listeners */
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log('[Orders] - Listening on port: ' + port);
  });
};

start();
