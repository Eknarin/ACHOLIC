'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
     .when('/package/create/diving', {
        templateUrl: 'views/package-create/package-lists/package-diving/package-diving.html',
        controller: 'PackageDivingCtrl',
	    access: {
        requiresLogin: true,
        requiredPermissions: ['Admin', 'Vendor']
      },
	    resolve: {
        packageData:['PackageItem' ,function(PackageItem){
             return new PackageItem;
          }]
	    }
      })
  });
