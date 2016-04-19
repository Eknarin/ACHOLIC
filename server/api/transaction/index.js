'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./transaction.controller');

router.get('/receipt', controller.index);
router.get('/checkTran', controller.checkTransaction);
router.get('/transac', controller.indexTran);
router.get('/transacAll', controller.indexAllTran);
router.get('/package', controller.indexTranPack);
router.get('/serial', controller.serial);
router.post('/serial', controller.serialActivate);
router.get('/:id', controller.show);

router.post('/cart', controller.createCart);
router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
