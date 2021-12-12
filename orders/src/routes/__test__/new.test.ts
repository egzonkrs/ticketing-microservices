import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { signin } from '../../test/signin-helper';
import { OrderStatus } from '@ek-ticketing/common';
import { Order } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('return an error if the ticket does not exists', async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', signin())
    .send({
      ticketId: ticketId
    })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  // create ticket
  const ticket = Ticket.build({
    title: 'Abu Dhabi Grand Prix 2021 Max Verstappen Champion of the world, PAIN!',
    price: 420
  });
  await ticket.save();
  // create an order
  const order = Order.build({
    ticket,
    userId: 'asjkdfhqejkwhas',
    status: OrderStatus.Created,
    expiresAt: new Date()
  })
  await order.save();
  await request(app)
    .post('/api/orders')
    .set('Cookie', signin())
    .send({
      ticketId: ticket.id
    })
    .expect(400);
});

it('reserves a ticket', async () => {
  // create ticket
  const ticket = Ticket.build({
    title: 'Abu Dhabi Grand Prix 2021 Max Verstappen Champion of the world, PAIN!',
    price: 420
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});