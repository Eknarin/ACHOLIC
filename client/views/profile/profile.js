'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileCtrl',
        access: {
	        requiresLogin: true,
        	requiredPermissions: ['Admin','Vendor','Customer']
	      }
      });
  });
