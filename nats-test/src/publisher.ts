import nats from 'node-nats-streaming';

console.clear();
// stan is (client), "nats" backwards is "stan"
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// this anon func will be executed after the client has successfully connected to NATS streaming server
stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});
