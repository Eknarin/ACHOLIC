'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
  bookmark: [{ type: Schema.Types.ObjectId, ref: 'Package' }]
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
