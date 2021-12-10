import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { signin } from '../../test/signin-helper';

jest.mock('../../nats-wrapper.ts');

it('has a route handler listeting to /api/tickets for post request', async () => {
  const responses = await request(app)
    .post('/api/tickets')
    .send({});

  expect(responses.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const responses = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});

it('return an status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({})

  // console.log(response.status);
  expect(response.status).not.toEqual(401);
});

it('return an error if an invalid title is provided', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
      price: 10
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      price: 10
    })
    .expect(400);
});

it('return an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'asdfsd23q',
      price: -10
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'asdasd3432'
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  // add in a check to make sure ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'UFC 256 Match';

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title,
      price: 50
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(50);
  expect(tickets[0].title).toEqual(title);
});