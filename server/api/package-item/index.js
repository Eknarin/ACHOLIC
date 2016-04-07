'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./package-item.controller');

router.get('/', controller.index);
router.get('/type', controller.indexType);
router.get('/package-type',controller.package_type)
router.get('/list', controller.indexList);
router.get('/myPackage', controller.myPackage);
router.get('/filter', controller.filter);
router.get('/recommend', controller.recommend);
router.get('/:id', controller.show);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
