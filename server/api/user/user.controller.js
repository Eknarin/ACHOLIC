'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var User = require('./user.model');
var RankVendor = require('../rank-user/rank-vendor.model');
var RankCustomer = require('../rank-user/rank-customer.model');
var Vendor = require('./vendor.model');

function handleError (res, err) {
  return res.status(500).send(err);
};

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.createCustomer = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    RankCustomer.findOne({rank_name:"Bronze Customer"}, function(err,rank){
        user.rank = rank._id;
        user.customer_level = 1;
        user.customer_exp = 0;
        user.role = "Customer";
        user.save();
        res.status(201).json({
          user: _.omit(user.toObject(), ['passwordHash', 'salt']),
          token: authService.signToken(user._id)
        });
    });
  });
};

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.loginFacebook = function (req, res) {
  User.findOne(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    res.status(201).json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: authService.signToken(user._id)
    });
  });
};


/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.checkUser = function (req, res) {
  User.findOne({'facebook_id': req.query.userId}).exec(function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    return res.status(200).json(user);
  });
};

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.setVendor = function (req, res) {
  User.findById(req.body.userId, function (err, user) {
    if (err) { return handleError(res, err); }
    Vendor.create(req.body, function(err,vendor){
       RankVendor.findOne({rank_name:"Bronze Vendor"}, function(err,rank){
        user.vendor = vendor._id;
        user.role = "Vendor";
        user.save();
        vendor.rank = rank._id;
        vendor.customer_level = 1;
        vendor.customer_exp = 0;
        vendor.save();
        res.status(201).json({
          user: _.omit(user.toObject(), ['passwordHash', 'salt']),
          token: authService.signToken(user._id)
        });
       });
    });
  });
};

/**
 * Return the current logged user.
 *
 * @param req
 * @param res
 */
exports.getMe = function (req, res) {
  User.findById(req.user._id).exec(function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    return res.status(200).json(user);
  });
};
