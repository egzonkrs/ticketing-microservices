import request from "supertest";
import { app } from "../../app";

it('response with details about current user', async () => {
  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test5@test.com',
      password: 'asdqwe123',
    })
    .expect(201);

  const cookie = authResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test5@test.com');
});