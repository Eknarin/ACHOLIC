'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amc/user', {
        templateUrl: 'views/amc/user-manage/user-manage.html',
        controller: 'AmcUserCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin']
	      }
      });
  });
