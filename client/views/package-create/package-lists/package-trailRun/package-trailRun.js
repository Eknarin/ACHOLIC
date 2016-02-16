'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
     .when('/package/create/trailRun', {
        templateUrl: 'views/package-create/package-lists/package-trailRun/package-trailRun.html',
        controller: 'PackageTrailRunCtrl',
	    access: {roleCheck: ['admin','vendor']},
	    resolve: {
	    }
      })
  });
