'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/package', {
        templateUrl: 'views/package/package.html',
        controller: 'PackageCtrl',
        resolve:{
        	itemData:['PackageItem','$location' ,function(PackageItem , $location){
			       return PackageItem.query({q: $location.search().q}).$promise;
        	}]
        }
      });
  });
