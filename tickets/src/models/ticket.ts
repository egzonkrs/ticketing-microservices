import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketAttrs {
  userId: string;
  title: string;
  price: number;
}

interface TicketDoc extends mongoose.Document {
  userId: string;
  title: string;
  price: number;
  version: number;
  orderId?: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

ticketSchema.set('versionKey', 'version'); // e ndrron/switch "__v" ne "version"
ticketSchema.plugin(updateIfCurrentPlugin);
// // pre - middleware that that's is going to run any time that we try to save a record
// ticketSchema.pre('save', function (done) {
//   this.$where = {
//     version: this.get('version') - 1
//   };
//   done();
// });

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };