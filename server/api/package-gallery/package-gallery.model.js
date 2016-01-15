'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageGallerySchema = new Schema({
  name: String
});

module.exports = mongoose.model('PackageGallery', PackageGallerySchema);
