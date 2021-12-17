import { NotAuthorizedError, NotFoundError, OrderStatus, requireAuth } from "@ek-ticketing/common";
import express, { Request, Response } from "express"
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";
// import { Ticket } from "../models/ticket";

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate('ticket');

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  // Set order status to "cancelled"
  order.status = OrderStatus.Cancelled;
  await order.save();

  // Publishing an event saying this order was cancelled!
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    }
  });

  res.status(204).send(order);
});

export { router as deleteOrderRouter }; 