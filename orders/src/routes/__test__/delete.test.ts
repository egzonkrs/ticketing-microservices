import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { signin } from '../../test/signin-helper';
import { OrderStatus } from '@ek-ticketing/common';
import { Order } from '../../models/order';

it('marks an order as cancelled', async () => {
  // Create a ticket with ticket model
  const ticket = Ticket.build({
    title: 'Concert',
    price: 80
  });
  await ticket.save();

  const user = signin();

  // Make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to cancel an order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // Expectation to make sure the order is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo('emits an order cancelled event'); // na tregon qe e kemi 1 todo per ma kry