'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-bookmark', {
        templateUrl: 'views/my-bookmark/my-bookmark.html',
        controller: 'MyBookmarkCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin', 'Vendor','Customer']
	      }
      });
  });
