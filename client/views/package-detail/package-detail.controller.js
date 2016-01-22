'use strict';

angular.module('acholic')
  .controller('PackageDetailCtrl',['$scope','itemData',function ($scope , itemData) {

  	$scope.packageItem = itemData;
  	console.log($scope.packageItem);

  }]);
