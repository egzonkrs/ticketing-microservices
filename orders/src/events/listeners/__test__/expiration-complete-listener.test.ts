import { ExpirationCompleteEvent, OrderStatus } from "@ek-ticketing/common";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import mongoose from 'mongoose';
import { Order } from "../../../models/order";

const setup = async () => {
  // create an instace of the listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  // create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 444
  });
  // save the ticket
  await ticket.save();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'asdasdsdfk123',
    expiresAt: new Date(),
    ticket: ticket
  });

  // save the order
  await order.save();

  // create a fake data event
  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { ticket, order, listener, data, msg };
};

it('update the order status to cancelled', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emit an OrderCancelled event', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

  expect(eventData.id).toEqual(order.id);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});