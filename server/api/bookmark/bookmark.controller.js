'use strict';

var _ = require('lodash');
var Bookmark = require('./bookmark.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Bookmark
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Bookmark.find(function (err, bookmarks) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(bookmarks);
  });
};

/**
 * Get a single Bookmark
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Bookmark.findById(req.params.id, function (err, bookmark) {
    if (err) { return handleError(res, err); }
    if (!bookmark) { return res.status(404).end(); }
    return res.status(200).json(bookmark);
  });
};

/**
 * Creates a new Bookmark in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Bookmark.create(req.body, function (err, bookmark) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(bookmark);
  });
};

/**
 * Updates an existing Bookmark in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Bookmark.findById(req.params.id, function (err, bookmark) {
    if (err) { return handleError(res, err); }
    if (!bookmark) { return res.status(404).end(); }
    var updated = _.merge(bookmark, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bookmark);
    });
  });
};

/**
 * Deletes a Bookmark from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Bookmark.findById(req.params.id, function (err, bookmark) {
    if (err) { return handleError(res, err); }
    if (!bookmark) { return res.status(404).end(); }
    bookmark.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
