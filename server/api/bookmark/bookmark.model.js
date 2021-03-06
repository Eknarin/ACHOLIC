'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var BookmarkSchema = new Schema({
  folder: {type: Schema.Types.ObjectId, ref: 'BookmarkFolder'},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  packageId: { type: Schema.Types.ObjectId, ref: 'PackageItem' },
  rating: Number,
  create_at: { type: Date, required: true, default: Date.now }
});

BookmarkSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Bookmark', BookmarkSchema ,'Bookmark');
