'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RankVendorSchema = new Schema({
  rank_name: String,
  lv_required: Number,
  privillage: { type: Schema.Types.ObjectId, ref: 'Coupon' }
});

module.exports = mongoose.model('RankVendor', RankVendorSchema ,'RankVendor');
