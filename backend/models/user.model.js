const mongoose = require('mongoose');

const { UserRoles } = require('../utils/constants');

const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Invalid email address'],
    unique: true,
  },
  phone: { type: String, required: true, minLength: 10 },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(UserRoles) },
  history: [
    {
      _id: false,
      orderId: { type: String, required: true },
    },
  ],
});

const User = mongoose.model('User', schema);

module.exports = User;
