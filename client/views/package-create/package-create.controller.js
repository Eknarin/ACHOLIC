'use strict';

angular.module('acholic')
  .controller('PackageCreateCtrl',['$scope','PackageItem',function ($scope , PackageItem) {

  	$scope.packageItem = new PackageItem;

  	$scope.onSubmit = function(){
  		console.log($scope.packageItem);
  		$scope.packageItem.$save();
  	};

  }]);

