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
  PackageItem.paginate({'name' : new RegExp(req.query.q)}, { page: req.query.page, limit: 9}, function(err, result) {
   if (err) { return handleError(res, err); }
   return res.status(200).json(result);
 });
};

/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
 exports.indexFilter = function (req, res) {
  PackageItem.paginate({'name' : new RegExp(req.query.q),'province': new RegExp(req.query.province),
    'price': {$gte:req.query.price_min,$lte:req.query.price_max},
    'rating':{$gte:req.query.rating}}, { page: req.query.page, limit: 9}, function(err, result) {
   if (err) { return handleError(res, err); }
   return res.status(200).json(result);
 });
};

/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
 exports.indexList = function (req, res) {
  PackageItem.find({'_id' : { $in : req.query.items }}).populate('map_id').exec(function(err, packageItem) {
   if (err) { return handleError(res, err); }
   var temp = [];
   var i = 0 
    function load() {
      if(i > packageItem.length-1)
         return res.status(200).json(temp);
      var options = {
        path: 'map_id.map_id',
        model: packageItem[i].map_id.map_table
      };
      PackageItem.populate(packageItem[i] ,options, function (err, packageDetail) {
        temp.push(packageDetail);
        i++;
        load();
      });
    };
    load();
  });
};

/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
 exports.indexType = function (req, res) {
  PackageItem.find({'package_type':req.query.package_type,'province': new RegExp(req.query.province),
    'price': {$gte:req.query.price_min,$lte:req.query.price_max},
    'rating':{$gte:req.query.rating}}).populate('map_id').exec(function(err, packageItem) {
   if (err) { return handleError(res, err); }
    if(packageItem.length){
      // console.log(packageItem);
      var option = {
          path: 'map_id.map_id',
          model: packageItem[0].map_id.map_table
      };
     PackageMap.populate(packageItem ,option,function (err, packageDetail) {
        var item_list = [];
        for(var i = 0;i<packageDetail.length ;i++){
          if(req.query.package_type == "PackageRafting")
            {
              var arr = packageDetail[i].map_id.map_id.level.split(" ");
              var num = Number(arr[1]);
            if(num >= req.query.extra)
              {
                var index = item_list.indexOf(i);
                item_list.push(packageDetail[i]._id);
              }
            }
          else if(req.query.package_type == "PackageDiving")
            {
              if(req.query.extra !== undefined&& req.query.extra2 !== undefined)
               {
                 var arr = packageDetail[i].map_id.map_id.diving_type;
                 var arr2 = packageDetail[i].map_id.map_id.diving_side;
                 if(arr.length == 2 && arr2 == req.query.extra2)
                    {
                        item_list.push(packageDetail[i]._id);
                    }
                  else if(arr[0] == req.query.extra && arr2 == req.query.extra2){
                    item_list.push(packageDetail[i]._id);
                  }
               }
                // var arr = packageDetail[i].map_id.map_id.diving_side;
              else if(req.query.extra !== undefined&& req.query.extra2 === undefined)
                {
                  var arr = packageDetail[i].map_id.map_id.diving_type;
                  if(arr.length == 2 )
                    {
                        item_list.push(packageDetail[i]._id);
                    }
                  else if(arr[0] == req.query.extra){
                    item_list.push(packageDetail[i]._id);
                  }
                }
               else if(req.query.extra2 !== undefined && req.query.extra === undefined)
               {
                  var arr2 = packageDetail[i].map_id.map_id.diving_side;
                  if(arr2 == req.query.extra2)
                    {
                      item_list.push(packageDetail[i]._id);
                    }
               }
               else{
                  // console.log(packageDetail[i]);
                  item_list.push(packageDetail[i]._id);
               }
                // var arr = packageDetail[i].map_id.map_id.diving_type;
            }
        }
        PackageItem.paginate({'_id' : { $in : item_list }},{page: req.query.page, limit: 9},function(err,result) {
            return res.status(200).json(result);
        });
     });
   }
  });
};

/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
 exports.myPackage = function (req, res) {
  if(req.query.rating)
  PackageItem.paginate({'user_id' : req.query.q}, {sort: {'rating': req.query.rating}, page: req.query.page, limit: 9}, function(err, result) {
   if (err) { return handleError(res, err); }
   return res.status(200).json(result);
 });
  else if(req.query.create)
  PackageItem.paginate({'user_id' : req.query.q}, {sort: {'created_at': req.query.create}, page: req.query.page, limit: 9}, function(err, result) {
   if (err) { return handleError(res, err); }
   return res.status(200).json(result);
 });
  else
  PackageItem.paginate({'user_id' : req.query.q}, { page: req.query.page, limit: 9}, function(err, result) {
   if (err) { return handleError(res, err); }
   return res.status(200).json(result);
 });
};

/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
 exports.myPackageAll = function (req, res) {
  PackageItem.find({'user_id' : req.query.q}, function(err, result) {
   if (err) { return handleError(res, err); }
   return res.status(200).json(result);
 });
};

/**
 * Get list of PackageItem
 *
 * @param req
 * @param res
 */
 exports.package_type = function (req, res) {
  var Obj = checkPackage(req.query.package_type);
    Obj.findOne({'_id':req.query.id}, function (err, packageDetail){
     if (err) { return handleError(res, err); }
      return res.status(200).json(packageDetail);
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
      packageItem.package_type = req.body.type;
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
 * Updates an existing PackageItem in the DB.
 *
 * @param req
 * @param res
 */
 exports.updatePackage = function (req, res) {
    PackageMap.findOne({map_id: req.body._id},function(err,pack){
      var Obj = checkPackage(pack.map_table);
      Obj.findById(req.params.id, function (err, pack2){
            if (err) { return handleError(res, err); }
            pack2.remove(function (err) {
              Obj.create(req.body, function (err, packageDetail){
                      if (err) { return handleError(res, err); }
                      return res.status(200).json(packageDetail);
                });
              });
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
