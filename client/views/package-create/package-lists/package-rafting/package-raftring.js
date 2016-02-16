'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
     .when('/package/create/rafting', {
        templateUrl: 'views/package-create/package-lists/package-rafting/package-rafting.html',
        controller: 'PackageRaftingCtrl',
	    access: {roleCheck: ['admin','vendor']},
	    resolve: {
	    }
      })
  });
