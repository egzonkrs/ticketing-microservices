import 'express-async-errors';
import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@ek-ticketing/common';

import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';
import { showOrderRouter } from './routes/show';
import { newOrderRouter } from './routes/new';

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

app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };