const mongoose = require('mongoose');

const { OrderStatus } = require('../utils/constants');

const Schema = mongoose.Schema;

const schema = new Schema({
  note: { type: String },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Number, required: true, default: () => Date.now() },
  updatedAt: { type: Number, required: true, default: () => Date.now() },
  status: { type: String, required: true, enum: Object.values(OrderStatus) },
  products: [
    {
      _id: false,
      productId: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
});

const Order = mongoose.model('Order', schema);

module.exports = Order;
