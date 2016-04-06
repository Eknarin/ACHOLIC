'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new Schema({
  email: String,
  first_name: String,
  last_name: String,
  gender: String,
  date_of_birth: Date,
  age_min: Number,
  phone_number: String,
  address: {
    address: String,
    zip_code: Number
  },
  customer_level: Number,
  customer_exp: Number,
  rank: { type: Schema.Types.ObjectId, ref: 'RankCustomer' },
  image: { type: Schema.Types.ObjectId, ref: 'Image' }, 
  facebook_image: String,
  role: String,
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  passwordHash: { type: String, select: false },
  facebook_id: String,
  salt: { type: String, select: false },
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

UserSchema.plugin(mongoosePaginate);
/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */

UserSchema
  .path('email')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({ email: value }, function (err, user) {
      if (err) { throw err; }
      if (user) {
        if (self.id === user.id) { return respond(true); }
        return respond(false);
      }
      respond(true);
    });
  }, 'email already used');

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate
   *
   * @param {String} password
   * @return {Boolean}
   */
  authenticate: function (password) {
    return this.encryptPassword(password) === this.passwordHash;
  },

  /**
   * Make salt
   *
   * @return {String}
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) { return ''; }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }

};

module.exports = mongoose.model('User', UserSchema ,'User');
