const mongoose = require("mongoose");

const { UserRoles } = require("../utils/constants");

const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Invalid email address"],
    unique: true,
  },
  phone: { type: String, required: true, minLength: 10, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(UserRoles) },
  history: [
    {
      _id: false,
      orderId: { type: String, required: true },
      products: [
        {
          _id: false,
          productId: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      createdAt: { type: Number, required: true },
      updatedAt: { type: Number, required: true },
      status: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
});

const User = mongoose.model("User", schema);

module.exports = User;
