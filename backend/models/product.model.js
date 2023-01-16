const mongoose = require("mongoose");
const _ = require("lodash");

const { ProductStatus } = require("../utils/constants");

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ _id: false, type: String }],
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true, enum: Object.values(ProductStatus) },
  sold: { type: Number, requied: true, default: () => _.random(50, 100) },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: () => _.random(3, 5),
  },
  categoryId: { type: String, required: true },
  cpuId: { type: String, required: true },
});

const Product = mongoose.model("Product", schema);

module.exports = Product;
