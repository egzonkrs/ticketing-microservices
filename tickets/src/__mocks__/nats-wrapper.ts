import { Stan } from "node-nats-streaming";

export const natsWrapper = {
  client: {
    publish: (subject: string, data: string, callback: () => void) => {
      callback();
    }
  }
};