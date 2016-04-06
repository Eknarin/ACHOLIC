'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amc/other', {
        templateUrl: 'views/amc/others/others.html',
        controller: 'AmcOtherCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin']
	      }
      });
  });
