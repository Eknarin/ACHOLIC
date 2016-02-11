'use strict';

var _ = require('lodash');
var Tag = require('./tag.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Tag
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Tag.find(function (err, tags) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(tags);
  });
};

/**
 * Get a single Tag
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if (err) { return handleError(res, err); }
    if (!tag) { return res.status(404).end(); }
    return res.status(200).json(tag);
  });
};

/**
 * Creates a new Tag in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Tag.create(req.body, function (err, tag) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(tag);
  });
};

/**
 * Updates an existing Tag in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Tag.findById(req.params.id, function (err, tag) {
    if (err) { return handleError(res, err); }
    if (!tag) { return res.status(404).end(); }
    var updated = _.merge(tag, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(tag);
    });
  });
};

/**
 * Deletes a Tag from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if (err) { return handleError(res, err); }
    if (!tag) { return res.status(404).end(); }
    tag.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
