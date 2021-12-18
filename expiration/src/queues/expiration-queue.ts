import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";
// Diagram Flow of jobs and events
//       +-------------------------+
//       |  order:created - event  |
//       +-------------------------+
//                    |
//                    |
//                    |
//                    |
// +--------------------------------------+                                        +---------------------------------+
// |         EXPIRATION SERVICE           |                                        |          REDIS SERVER           |
// | +----------------+                   |                                        | +-----------------------------+ |
// | |                | Code to enqueue   |                                        | | Lists of jobs with          | |
// | |                | the job      ----------------------------------------------+ | type of "order:expiration"  | |
// | |   expiration   |                   |                                        | |-----------------------------| |
// | |      queue     | Code to process   |                                        | |                             | |
// | |                | the job    -------------------------+                      | +-----------------------------+ |
// | +----------------+                   |                 |                      +----------------|----------------+
// +--------------------------------------+                 |                                       |
//                    |                                     |                                       |
//                    |                        +-------------------------------+                    |
//                    |                        |          Job:                 |--------------------+
//                    |                        |   "orderId": "sdfkj1h34jhasd" |
//     +-----------------------------+         +-------------------------------+
//     |     expiration:complete     |
//     |                             |
//     |  orderId: "sdfkj1h34jhasd"  |
//     +-----------------------------+                                                                                

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
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId
  });
});

export { expirationQueue };