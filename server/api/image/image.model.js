'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  image_file: { data: Buffer, contentType: String },
  typeRef: String,
  objectRef: Schema.Types.ObjectId
});

module.exports = mongoose.model('Image', ImageSchema);
