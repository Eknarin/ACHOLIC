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
 * Get a single User
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  User.findById(req.params.id).select('-passwordHash').exec(function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).end(); }
    return res.status(200).json(user);
  });
};

/**
 * Get list of User
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  User.paginate({},{ page: req.query.page, limit: 10},function (err, users) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(users);
  });
};

/**
 * Deletes a Transaction from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).end(); }
    user.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
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
	user.vendor = {};
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
 * Updates an existing Transaction in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).end(); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
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
	user.vendor = {};
	user.save();
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
  User.findById(req.user._id).populate('vendor').exec(function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    return res.status(200).json(user);
  });
};
