'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

router.get('/me', auth.isAuthenticated(), controller.getMe);
router.post('/customer', controller.createCustomer);
router.post('/vendor', controller.createVendor);
module.exports = router;
