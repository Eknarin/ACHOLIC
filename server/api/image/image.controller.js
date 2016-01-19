'use strict';

var _ = require('lodash');
var Image = require('./image.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Image
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Image.find(function (err, images) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(images);
  });
};

/**
 * Get a single Image
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if (!image) { return res.status(404).end(); }
    return res.status(200).json(image);
  });
};

/**
 * Creates a new Image in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Image.create(req.body, function (err, image) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(image);
  });
};

/**
 * Updates an existing Image in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if (!image) { return res.status(404).end(); }
    var updated = _.merge(image, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(image);
    });
  });
};

/**
 * Deletes a Image from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if (!image) { return res.status(404).end(); }
    image.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
