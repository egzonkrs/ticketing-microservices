import express, { Response, Request } from 'express';
import { currentUser } from '@ek-ticketing/common';
// import { requireAuth } from '@ek-ticketing/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };