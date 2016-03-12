'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/shopping-cart', {
        templateUrl: 'views/shopping-cart/shopping-cart.html',
        controller: 'ShoppingCartCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin', 'Vendor','Customer']
	      }
      });
  });
