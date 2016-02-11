'use strict';

angular.module('acholic')
  .controller('PackageCreateCtrl',['$scope','PackageItem','$location',function ($scope , PackageItem , $location) {

  	$scope.packageItem = new PackageItem;
  	$scope.images = [];
  
  	$scope.onSubmit = function(){
  		//console.log($scope.packageItem);
  		$scope.packageItem.$save().then(function(){
  			 $location.path("/package");
  		});
  	};

  }]);

