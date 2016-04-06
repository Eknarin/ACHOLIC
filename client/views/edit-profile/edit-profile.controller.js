'use strict';

angular.module('acholic')
  .controller('EditProfileCtrl',[ '$scope','Auth', function ($scope, Auth) {

  	console.log($scope.user);

  	$scope.user.date_of_birth = $scope.user.date_of_birth.substring(0, 10);
  	$scope.tabs = ["active", "", "", ""];
  	$scope.activeTab = function(goto){
        $scope.tabs = ["", "", "", ""];
        $scope.tabs[goto] = "active";
      }

      $scope.onSubmit= function(){
      //check first name
      if($scope.user.first_name == null){
        alert("Please enter your First Name.");
        return;
      }
      //check last name
      if($scope.user.last_name == null){
        alert("Please enter your Last Name.");
        return;
      }
      //check email
      if($scope.user.email == null){
        alert("Please fill your Email.");
        return;
      }
       else{
        //update user data
      }
    };

  }]);
