'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageMapSchema = new Schema({
  map_table: String,
  map_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('PackageMap', PackageMapSchema);
