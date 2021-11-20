import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const port: number = 3000 || process.env.PORT;

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }

  app.listen(port, () => {
    console.log('[Auth] - Listening on port: ' + port);
  });
};

start();
