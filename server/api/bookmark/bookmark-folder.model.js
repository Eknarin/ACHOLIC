'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookmarkFolderSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  folder: String,
  total: Number
});

module.exports = mongoose.model('BookmarkFolder', BookmarkFolderSchema ,'BookmarkFolder');
