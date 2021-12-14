import { OrderCancelledEvent, OrderCreatedEvent, Publisher, Subjects } from "@ek-ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}