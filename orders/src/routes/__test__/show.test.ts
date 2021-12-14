import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { signin } from '../../test/signin-helper';

it('fetches orders for a particular user', async () => {
  // Create three tickets
  const ticket = await Ticket.build({
    title: 'Sunny Hill Festival',
    price: 200
  });

  await ticket.save();
  const user = signin();

  console.log('TESTINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG 16')
  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('return an error if one user tries to fetch another users order', async () => {
  // Create three tickets
  const ticket = await Ticket.build({
    title: 'Sunny Hill Festival',
    price: 200
  });

  await ticket.save();
  const user = signin();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', signin()) // calling another user e jo "user" variable line 41!
    .send()
    .expect(401);
});