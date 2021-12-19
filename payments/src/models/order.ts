import { OrderStatus } from "@ek-ticketing/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// properties when we built an order
interface OrderAttrs {
  id: string;
  version: number;
  status: OrderStatus;
  userId: string;
  price: number;
}

// list of properties that an order has
interface OrderDoc extends mongoose.Document {
  // mongoose.Document already has "id" property
  version: number;
  status: OrderStatus;
  userId: string;
  price: number;
}

// list of properties that the model itself contains ex: custom methods etc...
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  // version will me maintained automatically
  userId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  // options argument
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    status: attrs.status,
    userId: attrs.userId
  });
};

// orderSchema.statics.findByEvent = (event: { id: string, version: number }) => {
//   return Order.findOne({
//     _id: event.id,
//     version: event.version - 1
//   })
// };

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };