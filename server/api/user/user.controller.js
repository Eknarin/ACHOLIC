'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var User = require('./user.model');
var Role = require('../role/role.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.createCustomer = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    Role.findOne({role:"Customer"}, function(err,role){
        //console.log(role._id);
        user.role = role._id;
        user.save();
        res.status(201).json({
          user: _.omit(user.toObject(), ['passwordHash', 'salt']),
          token: authService.signToken(user._id)
        });
    });
  });
};

exports.test = function (req, res) {

};
/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.createVendor = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    Role.findOne({role:"Vendor"}, function(err,role){
        //console.log(role._id);
        user.role = role._id;
        user.save();
        res.status(201).json({
          user: _.omit(user.toObject(), ['passwordHash', 'salt']),
          token: authService.signToken(user._id)
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
  User.findById(req.user._id).populate('role').exec(function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    console.log(user);
    res.status(200).json(user);
  });
};
