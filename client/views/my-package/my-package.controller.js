'use strict';

angular.module('acholic')
  .controller('MyPackageCtrl',['$scope','PackageItem','Auth', function ($scope, PackageItem,Auth) {
  	$scope.user = {};
  	$scope.package = {};
  	Auth.getUser().then(function(res){
  		$scope.user = res;
  		PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
	  		$scope.package = res.docs;
	  		console.log($scope.package);
  		});
  	});
    // get package create date
    $scope.getCreateDate = function(timeStamp){
      $scope.temp = new Date(timeStamp);
      $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();   
      return $scope.createDate;
    }

  }]);
