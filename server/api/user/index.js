'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

router.get('/', controller.index);
router.get('/me', auth.isAuthenticated(), controller.getMe);
router.get('/check-user', controller.checkUser);
router.get('/:id', controller.show);
router.post('/facebook', controller.loginFacebook);
router.post('/customer', controller.createCustomer);
router.post('/vendor', controller.setVendor);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;
