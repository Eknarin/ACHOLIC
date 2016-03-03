'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentTableSchema = new Schema({
  comments: [{ type: Schema.Types.ObjectId, ref:'Comment'}]
});

module.exports = mongoose.model('CommentTable', CommentTableSchema,'CommentTable');
