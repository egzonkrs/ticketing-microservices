import request from "supertest";
import { app } from "../../app";

it('return a 201 on succesful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'asdqwe123',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'asdqwe123',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testte@st.com',
      password: 'a',
    })
    .expect(400);
});


it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdqwe@qwe.com'
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      password: 'asdqweqwe123'
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdqwe@qwe.com',
      password: 'asdqew123'
    })
    .expect(201);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdqwe@qwe.com',
      password: 'asdqew123'
    })
    .expect(400);
});

it('sets a cookie after a successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'aqweqwe',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});