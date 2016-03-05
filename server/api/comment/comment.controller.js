'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var User = require('../user/user.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Comment
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Comment.find({package_id: req.query.package_id}).populate('user_id').exec(function (err, comments) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(comments);
  });
};

/**
 * Get a single Comment
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if (!comment) { return res.status(404).end(); }
    return res.status(200).json(comment);
  });
};

/**
 * Creates a new Comment in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Comment.create(req.body, function (err, comment) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(comment);
  });
};

/**
 * Updates an existing Comment in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if (!comment) { return res.status(404).end(); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(comment);
    });
  });
};

/**
 * Deletes a Comment from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if (!comment) { return res.status(404).end(); }
    comment.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
