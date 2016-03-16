'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendorSchema = new Schema({
  alt_email: String,
  identification_num: String,
  provider_num: String,
  address: {
    address: String,
    zip_code: Number
  },
  phone_number: String,
  vendor_level: Number,
  vendor_exp: Number,
  rank: { type: Schema.Types.ObjectId, ref: 'VendorCustomer' },
});

module.exports = mongoose.model('Vendor', VendorSchema ,'Vendor');
