import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/signin-helper";

it('return a 404 if the ticket is not found', async () => {
  await request(app)
    .get('/api/tickets/sdklrjwekldf')
    .send()
    .expect(404);
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

