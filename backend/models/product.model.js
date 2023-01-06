const mongoose = require("mongoose");
const _ = require("lodash");

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ _id: false, type: String }],
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  sold: { type: Number, requied: true, default: () => _.random(50, 100) },
  categoryId: { type: String, required: true },
});

const Product = mongoose.model("Product", schema);

module.exports = Product;
