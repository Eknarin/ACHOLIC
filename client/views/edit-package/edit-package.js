'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit-package/:id', {
        templateUrl: 'views/edit-package/edit-package.html',
        controller: 'EditPackageCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin', 'Vendor','Customer']
	      },
        resolve:{
          packageData:['PackageItem','$route', function(PackageItem , $route){
            return PackageItem.query({id : $route.current.params.id}).$promise;
          }]
        }
      });
  });