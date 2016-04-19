'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var mongoosePaginate = require('mongoose-paginate');

var TransactionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  vendor_id: { type: Schema.Types.ObjectId, ref: 'User' },
  packages_id: [{ type: Schema.Types.ObjectId, ref: 'PackageItem' }],
  type: String,
  price: Number,
  serial: {
    type: String,
    'default': shortid.generate
  },
  active_status: Boolean,
  created_at: { type: Date, default: Date.now },
  expired_at: Date
});

TransactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Transaction', TransactionSchema ,'Transaction');
