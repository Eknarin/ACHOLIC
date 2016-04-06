'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amc/package', {
        templateUrl: 'views/amc/package-manage/package-manage.html',
        controller: 'AmcPackageCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin']
	      }
      });
  });
