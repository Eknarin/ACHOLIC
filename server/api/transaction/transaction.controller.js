'use strict';

var _ = require('lodash');
var Transaction = require('./transaction.model');
var Receipt = require('./receipt.model');
var nodemailer = require("nodemailer");
var User = require('../user/user.model');

var transporter = nodemailer.createTransport({
 service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "mostmarkofficial@gmail.com",
       pass: "Mostmark123"
   }
});

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Transaction
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  if(req.query.price)
  Receipt.paginate({'user_id': req.query.user_id},{sort: {'total_price': req.query.price}, page: req.query.page, limit: 10, populate: 'transaction_id'},function (err, transactions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
  else if(req.query.create)
  Receipt.paginate({'user_id': req.query.user_id},{sort: {'created_at': req.query.create}, page: req.query.page, limit: 10, populate: 'transaction_id'},function (err, transactions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
  else
  Receipt.paginate({'user_id': req.query.user_id},{ page: req.query.page, limit: 10, populate: 'transaction_id'},function (err, transactions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
};

exports.checkTransaction = function (req, res) {
  Transaction.find({'packages_id': req.query.packageId,'confirm_at': req.query.confirm_at}).populate('packages_id').exec(function(err,tran){
    if (err) { return handleError(res, err); }
    return res.status(200).json(tran);
  });
};
/**
 * Get Serail
 *
 * @param req
 * @param res
 */
exports.serial = function (req, res) {
  Transaction.findOne({'serial': req.query.serial}).populate('user_id').exec(function (err, transactions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
};

/**
 * Activate serail
 *
 * @param req
 * @param res
 */
exports.serialActivate = function (req, res) {
  Transaction.findOne({'serial': req.body.serial},function (err, transaction) {
    if (err) { return handleError(res, err); }
    if (!transaction) { return res.status(404).end(); }
    transaction.active_status = true;
    transaction.save();
    return res.status(200).json(transaction);
  });
};
/**
 * Get list of Transaction
 *
 * @param req
 * @param res
 */
exports.indexTran = function (req, res) {
  Transaction.paginate({'vendor_id': req.query.vendor_id},{ page: req.query.page, limit: 10,populate:'user_id'},function (err, transactions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
};

/**
 * Get list of Transaction
 *
 * @param req
 * @param res
 */
exports.indexAllTran = function (req, res) {
  Transaction.find({'vendor_id': req.query.vendor_id}).populate('user_id').exec(function (err, transactions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
};
/**
 * Get list of Transaction
 *
 * @param req
 * @param res
 */
exports.indexTranPack = function (req, res) {
  Transaction.paginate({'vendor_id': req.query.vendor_id,'packages_id': req.query.package_id},{ page: req.query.page, limit: 10,populate:'user_id'},function (err, transactions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
};

/**
 * Get a single Transaction
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) { return handleError(res, err); }
    if (!transaction) { return res.status(404).end(); }
    return res.status(200).json(transaction);
  });
};

/**
 * Creates a new Transaction in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Transaction.create(req.body, function (err, transaction) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(transaction);
  });
};

/**
 * Creates a new Transaction in the DB.
 *
 * @param req
 * @param res
 */
exports.createCart = function (req, res) {
  Transaction.create(req.body.items, function (err, transactions) {
    if (err) { return handleError(res, err); }
    var recep = new Receipt;
    recep.total_price = 0;
    recep.user_id = transactions[0].user_id;
    for(var i = 0 ;i<transactions.length ;i++){
      recep.transaction_id.push(transactions[i]._id);
      recep.total_price += transactions[i].price;
        var CurrentDate = new Date();
        CurrentDate.setMonth(CurrentDate.getMonth() + req.body.items[0].expire);
        transactions[i].expired_at = CurrentDate;
        transactions[i].save();
    }
    recep.payment_status = false;
    recep.save();
    User.findById(recep.user_id,function(err,user){
        var mailOptions = {
            from: 'mostmarkofficial@gmail.com',
            to: user.email,
            subject: 'Receipt number : '+recep._id ,
            text: 'Hello, '+user.first_name+' '+user.last_name+'Your had created new transaction on our Mostmark website. The total price is '+recep.total_price+' Bath.'
        };
        transporter.sendMail(mailOptions, function(err) {
          console.log('Message sent!');
        });
    });
    return res.status(201).json(transactions);
  });
};

/**
 * Updates an existing Transaction in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) { return handleError(res, err); }
    if (!transaction) { return res.status(404).end(); }
    var updated = _.merge(transaction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(transaction);
    });
  });
};

/**
 * Deletes a Transaction from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) { return handleError(res, err); }
    if (!transaction) { return res.status(404).end(); }
    transaction.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
