'use strict';

var _ = require('lodash');
var Item = require('./item.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Item
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Item.find(function (err, items) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(items);
  });
};

/**
 * Get a single Item
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.status(404).end(); }
    return res.status(200).json(item);
  });
};

/**
 * Creates a new Item in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Item.create(req.body, function (err, item) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(item);
  });
};

/**
 * Updates an existing Item in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.status(404).end(); }
    var updated = _.merge(item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(item);
    });
  });
};

/**
 * Deletes a Item from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.status(404).end(); }
    item.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
