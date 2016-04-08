'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var PackageMapSchema = new Schema({
  map_table: String,
  map_id: Schema.Types.ObjectId
});

PackageMapSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PackageMap', PackageMapSchema , 'PackageMap');
