import request from "supertest";
import { app } from "../../app";

it('fails when email that does exists is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asdqwe123',
    })
    .expect(400);
});

it('fails when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'asdqwe123',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asdqwe1234',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test123@test.com',
      password: 'asdqwe123',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test123@test.com',
      password: 'asdqwe123',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});