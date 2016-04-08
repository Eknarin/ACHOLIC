'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit-rafting/:id', {
        templateUrl: 'views/edit-package/package-type/rafting-package.html',
        controller: 'EditRaftingPackageCtrl',
        access: {
	        requiresLogin: true,
	        requiredPermissions: ['Admin', 'Vendor','Customer']
	      },
        resolve:{
          packageData:['PackageItem','$route', function(PackageItem , $route){
            return PackageItem.query({id : $route.current.params.id}).$promise;
          }]
        }
      })
      .when('/edit-diving/:id', {
        templateUrl: 'views/edit-package/package-type/diving-package.html',
        controller: 'EditDivingPackageCtrl',
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