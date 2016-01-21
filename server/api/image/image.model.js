'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: String,
  img: { path: String, contentType: String }
});

module.exports = mongoose.model('Image', ImageSchema);
