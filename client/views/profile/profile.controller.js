'use strict';

angular.module('acholic')
  .controller('ProfileCtrl',['$scope','$rootScope','Auth','$location', function ($scope , $rootScope , Auth , $location) {
  	$scope.user = $rootScope._user;
  	$scope.dob = new Date($scope.user.date_of_birth);
  	$scope.user.date_of_birth = $scope.dob.getDate() + "/" + ($scope.dob.getMonth() + 1) + "/" + $scope.dob.getFullYear();

  	$scope.setVendor = function(){
  		 Auth.signupVendor($scope.user)
          .then(function (res) {
            $location.path('/');
          })
          .catch(function (err) {
            console.log(err);
          });
  	};
}]);
