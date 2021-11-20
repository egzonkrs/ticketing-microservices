import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// app.set('trust proxy', true); UNCOMMENT THIS BEFORE DEPLOYING!! 
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // ktheje ne true kur te bojme deploy
    // secure: false, // ktheje ne true kur te bojme deploy
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

export { app };