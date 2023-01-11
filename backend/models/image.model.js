const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  contentType: { type: String },
  image: { type: Buffer },
});

const Image = mongoose.model('Image', schema);

module.exports = Image;
