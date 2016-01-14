'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  contact: String,
  office_time: String,
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PackageItem', PackageItemSchema);
