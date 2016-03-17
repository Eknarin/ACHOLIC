'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit-package', {
        templateUrl: 'views/edit-package/edit-package.html',
        controller: 'EditPackageCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin', 'Vendor','Customer']
	      }
      });
  });