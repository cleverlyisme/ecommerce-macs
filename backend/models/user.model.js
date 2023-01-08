const mongoose = require('mongoose');

const { UserRoles } = require('../utils/constants');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', schema);

module.exports = User;
