'use strict';

angular.module('acholic')
  .controller('MyPackageCtrl',['$scope','PackageItem','Auth', function ($scope, PackageItem,Auth) {
  	$scope.user = {};
  	$scope.package = {};
  	Auth.getUser().then(function(res){
  		$scope.user = res;
  		PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
	  		$scope.package = res;
	  		console.log($scope.package);
  		});
  	});


  }]);
