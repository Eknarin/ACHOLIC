'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  rating: { type: Number, min: 0, max: 10 },
  people: String,
  price: Number,
  contact: {
  	email: String,
  	phone_number: String
	},
  location: String,
  office_time: {
  	open_time: String,
  	close_time: String,
  	note: String
	},
  availability: Boolean,
  tag: [{ type: Schema.Types.ObjectId, ref: 'Bookmark' }],
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PackageItem', PackageItemSchema);
