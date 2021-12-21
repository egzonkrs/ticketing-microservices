import { OrderCreatedEvent, PaymentCreatedEvent, Publisher, Subjects } from "@ek-ticketing/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}