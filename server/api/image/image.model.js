'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: String,
  image_path: String,
  contentType: String
});

module.exports = mongoose.model('Image', ImageSchema);
