'use strict';

angular.module('acholic')
  .controller('MyPackageCtrl',['$scope','PackageItem','$rootScope', function ($scope, PackageItem,$rootScope) {
  	$scope.user = $rootScope._user;
  	$scope.package = {};
  	PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
  		$scope.package = res;
  		console.log($scope.package);
  	});

  }]);
