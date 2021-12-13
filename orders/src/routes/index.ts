import { requireAuth } from "@ek-ticketing/common";
import express, { Request, Response } from "express"
// import { Ticket } from "../models/ticket";

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  // const orders = await Ticket.find({});
  res.send({ ok: 'OKOKOKOKOKOKOKOKOKOKOKOKO' });
});

export { router as indexOrderRouter }; 