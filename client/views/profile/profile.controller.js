'use strict';

angular.module('acholic')
  .controller('ProfileCtrl',['$scope','userData', function ($scope , userData) {
  	$scope.user = userData;
  	$scope.dob = new Date($scope.user.date_of_birth);
  	$scope.user.date_of_birth = $scope.dob.getDate() + "/" + ($scope.dob.getMonth() + 1) + "/" + $scope.dob.getFullYear();
  	console.log($scope.user);
}]);
