import { OrderStatus } from '@ek-ticketing/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order } from './order';

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
  /* 
    isReserved - qe ma vone me pase ma leht me check nese eshte reserved 
    p.sh const isReserved = await ticket.isReserved();
  */
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(event: { id: string, version: number }): Promise<TicketDoc | null>;
  // findByEvent - eshte query per me find by id and previous version
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);
// // pre - middleware that that's is going to run any time that we try to save a record
// // e njejta sikur updateIfCurrentPlugin veq me implementim tonin nuk ka funksionu mire
// ticketSchema.pre('save', function (done) {
//   this.$where = {
//     version: this.get('version') - 1
//   };
//   done();
// });

ticketSchema.statics.findByEvent = (event: { id: string, version: number }) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1
  })
};

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

ticketSchema.methods.isReserved = async function () {
  /* this (keyword) === the ticket document that we just called 'isReserved' on */
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      // $in: means "status" prop is "IN" some set of values that we provide in an array
      // status must not be "cancelled" so we don't put in array. (2.3)
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ]
    }
  });
  return !!existingOrder;
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };