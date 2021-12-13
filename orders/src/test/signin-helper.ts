import { sign } from "jsonwebtoken";
import mongoose from 'mongoose';
// import request from "supertest";
// import { app } from "../app";

export const signin = () => {
  // Build a JWT payload { id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.net'
  };

  // Create JWT!
  const token = sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that is the cookie with encoded data
  return [`express:sess=${base64}`];
};