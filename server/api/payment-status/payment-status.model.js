'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentStatusSchema = new Schema({
  status: String
});

module.exports = mongoose.model('PaymentStatus', PaymentStatusSchema);
