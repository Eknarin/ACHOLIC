'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageMapSchema = new Schema({
  collection: String,
  collection_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('PackageMap', PackageMapSchema);
