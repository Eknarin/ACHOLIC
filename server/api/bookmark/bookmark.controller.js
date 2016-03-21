'use strict';

var _ = require('lodash');
var Bookmark = require('./bookmark.model');
var BookmarkFolder = require('./bookmark-folder.model');
var User = require('../user/user.model');
var PackageItem = require('../package-item/package-item.model');

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
  Bookmark.paginate({userId: req.query.userId, folder: req.query.folderId},{ page: req.query.page, limit: 8, populate: 'packageId'},function (err, bookmarks) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(bookmarks);
  });
};

/**
 * Get list of Bookmark
 *
 * @param req
 * @param res
 */
exports.indexAll = function (req, res) {
  Bookmark.find({userId: req.query.userId}).populate('packageId').exec(function (err, bookmarks) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(bookmarks);
  });
};

/**
 * Get list of Bookmark
 *
 * @param req
 * @param res
 */
exports.indexAlls = function (req, res) {
  Bookmark.paginate({userId: req.query.userId}, { page: req.query.page, limit: 8, populate: 'packageId',sort: {'rating': -1}},function (err, bookmarks) {
    if (err) { return handleError(res, err); }
    console.log(bookmarks);
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
  Bookmark.create(req.body,function(err, bookmark){
     if (err) { return handleError(res, err); }
     BookmarkFolder.findById(req.body.folder, function(err,bookmarkFolder){
      bookmarkFolder.total += 1;
      bookmarkFolder.save();
      return res.status(201).json(bookmark);
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
    BookmarkFolder.findById(bookmark.folder, function(err,bookmarkFolder){
      if(bookmarkFolder){
        bookmarkFolder.total -= 1;
        bookmarkFolder.save();
      }
     });
    bookmark.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};

/**
 * Get list of Bookmark
 *
 * @param req
 * @param res
 */
exports.indexFolder = function (req, res) {
  BookmarkFolder.find({userId: req.query.userId},function (err, bookmarks) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(bookmarks);
  });
};

/**
 * Creates a new PackageGallery in the DB.
 *
 * @param req
 * @param res
 */
exports.createFolder = function (req, res) {
  BookmarkFolder.create({'userId' : req.body.user ,'folder': req.body.folder}, function (err, bookmark) {
    if (err) { return handleError(res, err); }
    bookmark.total = 0;
    bookmark.save();
    return res.status(201).json(bookmark);
  });
};

/**
 * Updates an existing Bookmark in the DB.
 *
 * @param req
 * @param res
 */
exports.updateFolder = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  BookmarkFolder.findById(req.params.id, function (err, bookmark) {
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
exports.destroyFolder = function (req, res) {
  BookmarkFolder.findById(req.params.id, function (err, bookmark) {
    if (err) { return handleError(res, err); }
    if (!bookmark) { return res.status(404).end(); }
    bookmark.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
