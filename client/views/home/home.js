'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
        resolve:{
        	itemData:['PackageItem' ,function(PackageItem){
			       return PackageItem.recommend();
        	}]
        }
      });
  });
