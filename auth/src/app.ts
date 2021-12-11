import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@ek-ticketing/common'

const app = express();

app.set('trust proxy', true); //UNCOMMENT THIS BEFORE DEPLOYING!! 
app.use(json());
app.use(
  cookieSession({
    signed: false,
    httpOnly: true,
    secure: false, // ktheje ne true kur te bojme deploy
    // secure: process.env.NODE_ENV !== 'test', // ktheje ne true kur te bojme deploy
    name: 'ticketing:session',
  })
);

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', async (req: Request, res: Response) => {
  console.error('Route not found - [*]');
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };