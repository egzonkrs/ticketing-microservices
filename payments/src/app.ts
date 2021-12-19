import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ek-ticketing/common'
import 'express-async-errors';
import { createChargeRouter } from './routes/new';

const app = express();

app.set('trust proxy', true); //UNCOMMENT THIS BEFORE DEPLOYING!! 
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, // ktheje ne true kur te bojme deploy
    // secure: process.env.NODE_ENV !== 'test', // ktheje ne true kur te bojme deploy
  })
);

app.use(currentUser);
app.use(createChargeRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };