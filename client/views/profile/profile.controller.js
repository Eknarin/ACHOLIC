'use strict';

angular.module('acholic')
  .controller('ProfileCtrl',['$scope','Auth','$location', function ($scope , Auth , $location) {
  	Auth.getUser().then(function(res){
      $scope.user = res;
        $scope.dob = new Date($scope.user.date_of_birth);
        if(!isNaN($scope.dob.getDate())){
          $scope.user.date_of_birth = $scope.dob.getDate() + "/" + ($scope.dob.getMonth() + 1) + "/" + $scope.dob.getFullYear();
        }else{ $scope.user.date_of_birth = '-';}
    });

  	$scope.setVendor = function(){
  		if($scope.user.role === 'Vendor')
  			console.log('already become a Vendor!!!');
  		else
        $location.path('/signup/vendor');
  	};
}]);
