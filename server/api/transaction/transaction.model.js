'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  packages_id: [{ type: Schema.Types.ObjectId, ref: 'PackageItem' }],
  type: String,
  price: Number,
  serial: String,
  active_status: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

module.exports = mongoose.model('Transaction', TransactionSchema ,'Transaction');
