import { OrderCreatedEvent, Publisher, Subjects } from "@ek-ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}