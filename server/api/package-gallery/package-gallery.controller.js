'use strict';

var _ = require('lodash');
var PackageGallery = require('./package-gallery.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of PackageGallery
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  PackageGallery.find(function (err, packageGallerys) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(packageGallerys);
  });
};

/**
 * Get a single PackageGallery
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  PackageGallery.findById(req.params.id, function (err, packageGallery) {
    if (err) { return handleError(res, err); }
    if (!packageGallery) { return res.status(404).end(); }
    return res.status(200).json(packageGallery);
  });
};

/**
 * Creates a new PackageGallery in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  PackageGallery.create(req.body, function (err, packageGallery) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(packageGallery);
  });
};

/**
 * Updates an existing PackageGallery in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  PackageGallery.findById(req.params.id, function (err, packageGallery) {
    if (err) { return handleError(res, err); }
    if (!packageGallery) { return res.status(404).end(); }
    var updated = _.merge(packageGallery, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(packageGallery);
    });
  });
};

/**
 * Deletes a PackageGallery from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  PackageGallery.findById(req.params.id, function (err, packageGallery) {
    if (err) { return handleError(res, err); }
    if (!packageGallery) { return res.status(404).end(); }
    packageGallery.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
