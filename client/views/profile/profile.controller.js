'use strict';

angular.module('acholic')
  .controller('ProfileCtrl',['$scope','$rootScope', function ($scope , $rootScope) {
  	$scope.user = $rootScope._user;
  	$scope.dob = new Date($scope.user.date_of_birth);
  	$scope.user.date_of_birth = $scope.dob.getDate() + "/" + ($scope.dob.getMonth() + 1) + "/" + $scope.dob.getFullYear();
}]);
