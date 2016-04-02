'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReceiptSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  transaction_id: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  total_price: Number,
  payment_status: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

module.exports = mongoose.model('Receipt', ReceiptSchema ,'Receipt');
