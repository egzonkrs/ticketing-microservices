import { Ticket } from "../ticket";


it('implements optimistic concurrency control', async () => {
  // Create an instance of an ticket
  const ticket = Ticket.build({
    title: 'Concert 123423',
    price: 5,
    userId: '123'
  });

  // Save the ticket to the database
  await ticket.save();

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // Save the first fetched ticket
  await firstInstance!.save();

  // Save the second fetched ticket and expect an error
  // expect(async () => {
  //   await secondInstance!.save();
  // }).toThrow();

  // Second fix - alternative
  try {
    await secondInstance!.save();
  } catch (err) {
    console.log(err);
    return;
    // done();
  }
  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  // Create an instance of an ticket
  const ticket = Ticket.build({
    title: 'Concert 123423',
    price: 5,
    userId: '123'
  });

  // Save the ticket to the database
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});