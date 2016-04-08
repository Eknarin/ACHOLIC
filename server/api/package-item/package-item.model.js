'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var PackageItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  province: String,
  rating: { type: Number, min: 0, max: 5 },
  created_at: { type: Date, default: Date.now },
  package_type: String,
  map_id: { type: Schema.Types.ObjectId, ref: 'PackageMap' },
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
  user_id: { type: Schema.Types.ObjectId, ref:'User'},
  comment_map: { type: Schema.Types.ObjectId, ref:'CommentTable'}
});

PackageItemSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('PackageItem', PackageItemSchema ,'PackageItem');