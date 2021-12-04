import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { signin } from "../../test/signin-helper";

const createTicket = () => {
  return request(app)
    .post('/api/tickets/')
    .set('Cookie', signin())
    .send({
      title: 'asdtrsdf',
      price: 20
    });
}

it('can fetch a list of tickets', async () => {
  // we create 3 tickets
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});

it('return the ticket if the ticket is found', async () => {
  const title = 'UFC Match 356';
  const price = 20;
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title, price
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

