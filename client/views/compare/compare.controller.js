'use strict';

angular.module('acholic')
  .controller('CompareCtrl',['$scope','Compare','PackageItem',function ($scope , Compare ,PackageItem) {

  	$scope.comparePackage =  Compare.getCompare();
  	$scope.loadItem = false;

  	PackageItem.list({items: $scope.comparePackage.items}).$promise.then(function(res){
  		$scope.comparePackage.items = res;
  		$scope.loadItem = true;
		console.log($scope.comparePackage);
  	});

  }]);
