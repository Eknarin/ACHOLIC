'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref:'User'},
  comment: String,
  rate: Number
});

module.exports = mongoose.model('Comment', CommentSchema,'Comment');
