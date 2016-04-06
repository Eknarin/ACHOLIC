'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amc/main', {
        templateUrl: 'views/amc/main-cont/main-cont.html',
        controller: 'AmcMainCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin']
	      }
      });
  });
