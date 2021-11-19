import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const port: number = 3000 || process.env.PORT;
const app = express();

// app.set('trust proxy', true); UNCOMMENT THIS BEFORE DEPLOYING!! 
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, // ktheje ne true kur te bojme deploy
  })
);

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
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
