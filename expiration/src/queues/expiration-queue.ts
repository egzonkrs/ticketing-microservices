import Queue from "bull";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST
  }
});

// code to process a job
expirationQueue.process(async (job) => {
  // job.data.orderId
  console.log('I want to publish an expiration:complete event for orderId', job.data.orderId);
});

export { expirationQueue };