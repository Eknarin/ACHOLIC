'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendorSchema = new Schema({
  provider_num: String,
  vendor_level: Number,
  vendor_exp: Number,
  rank: { type: Schema.Types.ObjectId, ref: 'VendorCustomer' },
});

module.exports = mongoose.model('Vendor', VendorSchema ,'Vendor');
