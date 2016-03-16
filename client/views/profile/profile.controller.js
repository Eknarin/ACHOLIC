'use strict';

angular.module('acholic')
  .controller('ProfileCtrl',['$scope','$rootScope','$location', function ($scope , $rootScope , $location) {
  	$scope.user = $rootScope._user;
  	$scope.dob = new Date($scope.user.date_of_birth);
  	$scope.user.date_of_birth = $scope.dob.getDate() + "/" + ($scope.dob.getMonth() + 1) + "/" + $scope.dob.getFullYear();

  	$scope.setVendor = function(){
  		if($scope.user.role === 'Vendor')
  			console.log('already become a Vendor!!!');
  		else
        $location.path('/signup/vendor');
  	};
}]);
