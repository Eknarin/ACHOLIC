'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
     .when('/package/create/diving', {
        templateUrl: 'views/package-create/package-lists/package-diving/package-diving.html',
        controller: 'PackageDivingCtrl',
	    access: {roleCheck: ['admin','vendor']},
	    resolve: {
	    }
      })
  });
