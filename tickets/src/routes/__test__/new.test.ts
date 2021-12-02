import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/signin-helper';

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

  console.log(response.status);
  expect(response.status).not.toEqual(401);
});

it('return an error if an invalid title is provided', async () => {
  await request(app)
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
  const resp1 = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'asdfsd23q',
      price: -10
    })
    .expect(400);
  console.log(resp1);

  const resp2 = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'asdasd3432'
    })
    .expect(400);
  console.log(resp2);
});

it('creates a ticket with valid inputs', async () => {

});