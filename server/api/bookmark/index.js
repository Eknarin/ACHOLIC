'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./bookmark.controller');

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/folder', controller.indexFolder)
router.post('/folder', controller.createFolder);
router.put('/folder', controller.updateFolder);
router.delete('/folder/:id', controller.destroyFolder);
router.delete('/:id', controller.destroy);
router.get('/:id', controller.show);


module.exports = router;
