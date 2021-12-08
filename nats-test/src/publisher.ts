import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();
// stan is (client), "nats" backwards is "stan"
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// this anon func will be executed after the client has successfully connected to NATS streaming server
stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123123',
      title: 'UFC 254',
      price: 100
    })
  } catch (error) {
    console.error(error);
  }
  // Before refactoring
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20,
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });
});
