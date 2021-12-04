import request from "supertest";
import mongoose from 'mongoose';
import { app } from "../../app";
import { signin } from "../../test/signin-helper";

it('return a 404 if a provided id does not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/app/tickets/${id}`)
    .set('Cookie', signin())
    .send({
      title: 'dklsjfasd',
      price: 40
    })
    .expect(404);
});


it('return a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/app/tickets/${id}`)
    .send({
      title: 'dklsjfasd',
      price: 40
    })
    .expect(401);
});


// it('return a 404 if the user does not own the ticket', async () => {
//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', signin())
//     .send({
//       title: 'asdasfd',
//       price: 20
//     });

//   await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set('Cookie', signin())
//     .send({
//       title: 'eqwsfdsda',
//       price: 250
//     })
//     .expect(401);
// });


// it('return a 400 if the user provides an invalid title or price', async () => {
//   const cookie = signin();
//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', cookie)
//     .send({
//       title: 'asdasfd',
//       price: 20
//     });

//   await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: '',
//       price: 250
//     })
//     .expect(400);

//   await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: 'qwesdfdssdf',
//       price: -10
//     })
//     .expect(400);
// });


// it('updates the ticket provided valid inputs', async () => {
//   const cookie = signin();
//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', cookie)
//     .send({
//       title: 'asdasfd',
//       price: 20
//     });

//   await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: 'UFC Match 500',
//       price: 150
//     })
//     .expect(200);

//   const ticketResponse = await request(app)
//     .get(`/api/tickets/${response.body.id}`)
//     .send();

//   expect(ticketResponse.body.title).toEqual('UFC Match 500');
//   expect(ticketResponse.body.title).toEqual(150);
// });