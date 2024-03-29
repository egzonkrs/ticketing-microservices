import axios from 'axios';

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Account = {
  current: () => requests.get('/api/users/currentuser'),
  signup: (user) => requests.post('/api/users/signup', user),
  signin: (user) => requests.post('/api/users/signin', user),
  signout: () => requests.post('/api/users/signout', {}),
};

const Tickets = {
  create: (ticket) => requests.post('/api/tickets', ticket),
};

const Orders = {
  create: (ticketId) => requests.post('/api/orders', ticketId),
};

const Payments = {
  create: (orderId) => requests.post('/api/payments', orderId),
};

const agent = {
  Account,
  Tickets,
  Orders,
  Payments,
};

export default agent;
