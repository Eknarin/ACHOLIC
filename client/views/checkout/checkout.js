'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: 'views/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin', 'Vendor','Customer']
	      }
      });
  });
