import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@ek-ticketing/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime();
    // add - we put in the payload or the information that we want to stick in the job itself
    await expirationQueue.add(
      {
        orderId: data.id
      },
      {
        delay: delay
      }
    );
    // Ack the message
    msg.ack();
  }
}