'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

router.get('/me', auth.isAuthenticated(), controller.getMe);
router.get('/check-user', controller.checkUser);
router.post('/facebook', controller.loginFacebook);
router.post('/customer', controller.createCustomer);
router.post('/vendor', controller.setVendor);
module.exports = router;
