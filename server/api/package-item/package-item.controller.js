'use strict';

var _ = require('lodash');
var PackageItem = require('./package-item.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  if(req.query){
    PackageItem.find({'name' : new RegExp(req.query.q, 'i')},function (err, packageItems) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(packageItems);
    });
  } else {
    PackageItem.find(function (err, packageItems) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(packageItems);
    });
  }
};

/**
 * Get a single PackageItem
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  PackageItem.findById(req.params.id, function (err, packageItem) {
    if (err) { return handleError(res, err); }
    if (!packageItem) { return res.status(404).end(); }
    return res.status(200).json(packageItem);
  });
};

/**
 * Creates a new PackageItem in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  console.log(req.body);
  PackageItem.create(req.body, function (err, packageItem) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(packageItem);
  });
};

/**
 * Updates an existing PackageItem in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  PackageItem.findById(req.params.id, function (err, packageItem) {
    if (err) { return handleError(res, err); }
    if (!packageItem) { return res.status(404).end(); }
    var updated = _.merge(packageItem, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(packageItem);
    });
  });
};

/**
 * Deletes a PackageItem from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  PackageItem.findById(req.params.id, function (err, packageItem) {
    if (err) { return handleError(res, err); }
    if (!packageItem) { return res.status(404).end(); }
    packageItem.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
