'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageGallerySchema = new Schema({
  total_images: Number,
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }]
});

module.exports = mongoose.model('PackageGallery', PackageGallerySchema , 'PackageGallery');
