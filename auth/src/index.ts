import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const port = process.env.PORT || 3000;

  if (!process.env.JWT_KEY) {
    throw new Error('[Auth] - JWT_KEY must be defined!');
  } else if (!process.env.MONGO_URI) {
    throw new Error('[Auth] - MONGO_URI must be defined!');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }

  app.listen(port, () => {
    console.log('[Auth] - Listening on port: ' + port);
  });
};

start();
