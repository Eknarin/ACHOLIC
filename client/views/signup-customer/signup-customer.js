'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup/customer', {
        templateUrl: 'views/signup-customer/signup-customer.html',
        controller: 'SignupCustomerCtrl',
        access: {
	        requiresLogin: false
	      }
      });
  });
