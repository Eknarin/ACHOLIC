'use strict';

var _ = require('lodash');
var Transaction = require('./transaction.model');
var Receipt = require('./receipt.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Transaction
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Receipt.paginate({userId: req.query.userId},{ page: req.query.page, limit: 10, populate: 'transaction_id'},function (err, transactions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
};

/**
 * Get a single Transaction
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) { return handleError(res, err); }
    if (!transaction) { return res.status(404).end(); }
    return res.status(200).json(transaction);
  });
};

/**
 * Creates a new Transaction in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Transaction.create(req.body, function (err, transaction) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(transaction);
  });
};

/**
 * Creates a new Transaction in the DB.
 *
 * @param req
 * @param res
 */
exports.createCart = function (req, res) {
  Transaction.create(req.body.items, function (err, transactions) {
    if (err) { return handleError(res, err); }
    var recep = new Receipt;
    recep.total_price = 0;
    recep.user_id = transactions[0].user_id;
    for(var i = 0 ;i<transactions.length ;i++){
      recep.transaction_id.push(transactions[i]._id);
      recep.total_price += transactions[i].price;
    }
    recep.payment_status = false;
    recep.save();
    return res.status(201).json(transactions);
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
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) { return handleError(res, err); }
    if (!transaction) { return res.status(404).end(); }
    var updated = _.merge(transaction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(transaction);
    });
  });
};

/**
 * Deletes a Transaction from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) { return handleError(res, err); }
    if (!transaction) { return res.status(404).end(); }
    transaction.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
