import { requireAuth, validateRequest } from "@ek-ticketing/common";
import express, { Request, Response } from "express"
import { body } from "express-validator";
import mongoose from "mongoose";
// import { Ticket } from "../models/ticket";

const router = express.Router();

router.post('/api/orders', requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // makes sure user is providing valid mongodb id
      .withMessage('Ticket id must be provided')
  ], validateRequest,
  async (req: Request, res: Response) => {
    // const orders = await Ticket.find({});
    res.send({});
  });

export { router as newOrderRouter }; 