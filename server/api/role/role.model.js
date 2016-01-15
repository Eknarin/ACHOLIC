'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  role: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', RoleSchema);
