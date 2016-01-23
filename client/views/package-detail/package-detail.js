'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/packageDetail/create', {
        templateUrl: 'views/package-detail/package-create.html',
        controller: 'PackageCreateCtrl'
      })
      .when('/packageDetail/:id', {
        templateUrl: 'views/package-detail/package-detail.html',
        controller: 'PackageDetailCtrl',
        resolve:{
        	itemData:['PackageItem','$route', function(PackageItem , $route){
        		return PackageItem.query({id : $route.current.params.id});
        	}]
        }
      })
  });
