import { NotFoundError } from "@ek-ticketing/common";
import express, { Request, Response } from "express"
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) throw new NotFoundError();

  // status code is default 200 
  res.send(ticket);
});

export { router as showTicketRouter }; 