import express, { Request, Response } from "express"
// import { Ticket } from "../models/ticket";

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  // const orders = await Ticket.find({});
  res.send({});
});

export { router as deleteOrderRouter }; 