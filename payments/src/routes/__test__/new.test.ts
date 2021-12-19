import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { signin } from '../../test/signin-helper';
import { OrderStatus } from '@ek-ticketing/common';
import { Order } from '../../models/order';
import { stripe } from '../../stripe';

// redirect requestin tek 'stripe.ts'
jest.mock('../../stripe.ts');

it('return a 404 when purchasing an order that does not exists', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', signin())
    .send({
      token: 'kaslfjasklf',
      orderId: new mongoose.Types.ObjectId().toHexString()
    })
    .expect(404);
});

it('return a 401 when purchasing an order that doesnt belong to the user', async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created
  });

  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', signin())
    .send({
      token: 'kaslfjasklf',
      orderId: order.id
    })
    .expect(401);
});

it('return a 400 when purchasing a cancelled order', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Cancelled,
    version: 0,
    price: 20,
    userId: userId,
  });

  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', signin(userId))
    .send({
      orderId: order.id,
      token: 'kaslfjasklf'
    })
    .expect(400);
});

it('returns a 204 with a valid inputs', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    version: 0,
    price: 20,
    userId: userId,
  });

  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', signin(userId))
    .send({
      token: "tok_visa",
      orderId: order.id
    })
    .expect(201);

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargeOptions.source).toEqual("tok_visa");
  expect(chargeOptions.amount).toEqual(20 * 100);
  expect(chargeOptions.currency).toEqual('usd');
});