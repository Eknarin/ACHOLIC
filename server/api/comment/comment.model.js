'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  package_id: { type: Schema.Types.ObjectId, ref:'PackageItem'},
  user_id: { type: Schema.Types.ObjectId, ref:'User'},
  text: String,
  rate: Number,
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: Date
});

module.exports = mongoose.model('Comment', CommentSchema,'Comment');
