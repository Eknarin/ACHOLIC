'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageGallerySchema = new Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('PackageGallery', PackageGallerySchema , 'PackageGallery');
