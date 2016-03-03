'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var PackageItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  rating: { type: Number, min: 0, max: 10 },
  created_at: { type: Date, default: Date.now },
  map_id: { type: Schema.Types.ObjectId, ref: 'PackageMap' },
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
  user_id: { type: Schema.Types.ObjectId, ref:'User'},
  comment_map: { type: Schema.Types.ObjectId, ref:'CommentTable'}
});

PackageItemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('PackageItem', PackageItemSchema ,'PackageItem');

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