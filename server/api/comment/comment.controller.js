'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var User = require('../user/user.model');
var PackageItem = require('../package-item/package-item.model');

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
    var count_comments = 0;
    var new_rating = 0;
    Comment.count({'package_id': comment.package_id},function(err,count){
    count_comments = count;
    console.log("comment n: "+count_comments);
      PackageItem.findById(comment.package_id,function(err,packageItem){
        var r0 = packageItem.rating; 
        console.log("package rate= "+r0);
        console.log("latest rate= "+comment.rate);
        var temp1 = (r0*(count_comments-1))+comment.rate;
        var temp2 = temp1/count_comments;
        new_rating = Math.round(temp2 * 10) / 10;//rating of this package
        console.log("cal rate = "+new_rating);

        packageItem.rating = new_rating;
        packageItem.save();
        return res.status(201).json(comment);
      });

    });
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
