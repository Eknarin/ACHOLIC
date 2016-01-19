'use strict';

var _ = require('lodash');
var PaymentStatus = require('./payment-status.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of PaymentStatus
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  PaymentStatus.find(function (err, paymentStatuss) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(paymentStatuss);
  });
};

/**
 * Get a single PaymentStatus
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  PaymentStatus.findById(req.params.id, function (err, paymentStatus) {
    if (err) { return handleError(res, err); }
    if (!paymentStatus) { return res.status(404).end(); }
    return res.status(200).json(paymentStatus);
  });
};

/**
 * Creates a new PaymentStatus in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  PaymentStatus.create(req.body, function (err, paymentStatus) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(paymentStatus);
  });
};

/**
 * Updates an existing PaymentStatus in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  PaymentStatus.findById(req.params.id, function (err, paymentStatus) {
    if (err) { return handleError(res, err); }
    if (!paymentStatus) { return res.status(404).end(); }
    var updated = _.merge(paymentStatus, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(paymentStatus);
    });
  });
};

/**
 * Deletes a PaymentStatus from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  PaymentStatus.findById(req.params.id, function (err, paymentStatus) {
    if (err) { return handleError(res, err); }
    if (!paymentStatus) { return res.status(404).end(); }
    paymentStatus.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
