import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  const port = process.env.PORT || 3000;

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
