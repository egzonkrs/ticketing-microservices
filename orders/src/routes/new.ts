import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@ek-ticketing/common";
import express, { Request, Response } from "express"
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60; // 15 Minutes

router.post('/api/orders', requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // makes sure user is providing valid mongodb id
      .withMessage('Ticket id must be provided')
  ], validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    /*
      1. Find the ticket the user is trying to order in the database if 
      we fail to find it for some reason, then potentially the ticket
      has already been purchased, or ticket is deleted, or maybe an user
      send a malicious request to try to buy a ticket that dosen't exists.
    */
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new NotFoundError();

    /*
      2. Make sure that this ticket is not already reserved (15 min time)
      imagine a lot of traffic, ex: 10 users try to purchase same ticket 
      at the same time, so we make sure the ticket is not already reserved 
      by someone else, just finding the ticket inside the db is not enough.
        2.1 Run query to look at all orders.
        2.2 Find an order where the ticket is the ticket we just found above
        2.3 Check if order status is NOT "cancelled".
        2.4 If we find an order from that means the ticket IS reserved.
    */

    /* SEE: 2.4 If we find an order from that means the ticket IS reserved. */
    const isReserved = await ticket.isReserved();

    if (isReserved) throw new BadRequestError('Ticket is already reserved', 'ticket');

    /*
      3. Calculate an expiration date for this order, (15 min to pay) 
    */
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    /*
      4. Build the order and save it to the database
    */
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });
    await order.save();

    /*
      5. Tell the rest of app (other services that need to know) that a order has been created.
      so we publish an event saying that an order was created.
    */
    res.status(201).send(order);
  });

export { router as newOrderRouter }; 