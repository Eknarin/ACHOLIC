'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  packages_id: [{ type: Schema.Types.ObjectId, ref: 'Bookmark' }],
  price: Number,
  payment_status: { type: Schema.Types.ObjectId, ref: 'PaymentStatus' },
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
