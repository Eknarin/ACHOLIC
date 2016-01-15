'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
  tag: { type: String, required: true, unique: true },
  description: String,
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tag', TagSchema);
