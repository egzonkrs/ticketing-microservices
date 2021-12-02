import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;
// qeky hook bohet run before all of our tests
beforeAll(async () => {
  process.env.JWT_KEY = 'asdwerklfjsdlfjs';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

// qeky hook bohet run before each of our tests (before our test starts)
beforeEach(async () => {
  // para se me run testin i fshijme all data ne mongodb memory server
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// ky hook bohet run kur krejt testet bohen complete
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

jest.setTimeout(999999);