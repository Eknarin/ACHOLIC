'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  package_id: { type: Schema.Types.ObjectId, ref:'PackageItem'},
  user_id: { type: Schema.Types.ObjectId, ref:'User'},
  text: String,
  rate: Number,
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema,'Comment');
