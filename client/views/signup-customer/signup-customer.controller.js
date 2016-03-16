'use strict';

angular.module('acholic')
  .controller('SignupCustomerCtrl',['$scope' , 'Auth', '$location', function ($scope , Auth , $location) {
    $scope.user = {};

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
      //check password
      if($scope.user.password == null){
        alert("Please set your password.");
        return;
      }
      //check repassword
      if($scope.user.repassword == null){
        alert("Please re-enter your password in confirm field.");
        return;
      }

      //check password matching
      if($scope.user.password != $scope.user.repassword){
        alert("Your password does not match the confirm password!");
        return;
      } else{
        Auth.signupCustomer($scope.user)
            .then(function (res) {
              $location.path('/');
            })
            .catch(function (err) {
              console.log(err);
            });
      }
    };

      $scope.tabs = ["active", "", "", ""];
      $scope.activeTab = function(goto){
        $scope.tabs = ["", "", "", ""];
        $scope.tabs[goto] = "active";
      }

  }]);
