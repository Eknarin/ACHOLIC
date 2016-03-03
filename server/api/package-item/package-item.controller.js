'use strict';

var _ = require('lodash');
var PackageItem = require('./package-item.model');
var PackageMap = require('./package-map.model');
var PackageDiving = require('./package-lists/package-diving.model');
var PackageRafting = require('./package-lists/package-rafting.model');
var PackageTrailRun = require('./package-lists/package-trailRun.model');


function handleError (res, err) {
  return res.status(500).send(err);
}

function checkPackage (type) {
  if(type == "PackageDiving"){
    return PackageDiving;
  }else if(type == "PackageRafting"){
    return PackageRafting;
  }else if(type == "PackageTrailRun"){
    return PackageTrailRun;
  }
}
/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    PackageItem.paginate({'name' : new RegExp(req.query.q, 'i')}, { page: req.query.page, limit: 9}, function(err, result) {
        return res.status(200).json(result);
    });
};

/**
 * Get list of PackageItem filter
 *
 * @param req
 * @param res
 */
exports.filter = function (req, res) {
  PackageItem.find({"$and": [{'location' : { $eq: req.query.location, $exists: true }}, 
                  {'tag' : { $eq : req.query.tag , $exists: true}},
                  {'people.min' : { $lte : req.query.people , $exists: true}},
                  {'people.max' : { $gte : req.query.people , $exists: true}},
                  {'price' : { $gte : req.query.priceMin , $lte : req.query.priceMax}}]
  },function (err, packageItems) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(packageItems);
    });
};

/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
exports.recommend = function (req, res) {
    PackageItem.find({}).sort({'rating': -1}).limit(6).exec(function (err, packageItems) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(packageItems);
    });
};

/**
 * Get a single PackageItem
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  PackageItem.findById(req.params.id).populate('user_id').populate('map_id').exec(function (err, packageItem) {
    if (err) { return handleError(res, err); }
    if (!packageItem) { return res.status(404).end(); }
    if(packageItem.map_id)
      if(packageItem.map_id.map_table){
        var Obj = checkPackage(packageItem.map_id.map_table);

        var options = {
          path: 'map_id.map_id',
          model: packageItem.map_id.map_table
        };

        PackageItem.populate(packageItem ,options, function (err, packageDetail) {
          return res.status(200).json(packageDetail);
        });
      }
    });
};

/**
 * Creates a new PackageItem in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  //console.log(req.body.info);
  PackageItem.create(req.body, function (err, packageItem) {
    if (err) { return handleError(res, err); }
    var Obj = checkPackage(req.body.type);
    Obj.create(req.body.info, function (err, packageDetail){
      if(err){
        console.log(err);
      }
      //console.log(packageDetail);
        var map = new PackageMap;
        map.map_table = req.body.type;
        map.map_id = packageDetail._id;
        map.save();
        packageItem.map_id = map._id;
        packageItem.save();
    });
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
