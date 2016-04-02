'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./transaction.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/cart', controller.createCart);
router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
