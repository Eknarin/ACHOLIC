'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  rating: { type: Number, min: 0, max: 10 },
  created_at: { type: Date, default: Date.now },
  map_id: Schema.Types.ObjectId,
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
  user_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('PackageItem', PackageItemSchema);

  // people: {
  //   min: Number,
  //   max: Number,
  // },
  // price: Number,
  // contact: {
  //   email: String,
  //   phone_number: String
  // },
  // location: String,
  // office_time: {
  //   open_time: String,
  //   close_time: String,
  //   note: String
  // },
  // availability: Boolean,
  // tag: [String],
  // image: { type: Schema.Types.ObjectId, ref: 'Image' },