import { requireAuth } from "@ek-ticketing/common";
import express, { Request, Response } from "express"
import { Order } from "../models/order";
// import { Ticket } from "../models/ticket";

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id
  }).populate('ticket');
  /* 
    populate('ticket') - for each order that we fetch we 
    also want to include the ticket that the order is for.
    So fetch the ticket and get its title and price...
  */

  res.send(orders);
});

export { router as indexOrderRouter }; 