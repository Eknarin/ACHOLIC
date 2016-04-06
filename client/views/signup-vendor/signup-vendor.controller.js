'use strict';

angular.module('acholic')
  .controller('SignupVendorCtrl',['$scope', 'Auth','$location', function ($scope , Auth , $location) {
    $scope.vendor = {};
    Auth.getUser().then(function(res){
      $scope.vendor.userId = res._id;
      $scope.vendor.email = res.email;
      $scope.vendor.phone_number = res.phone_number;
    });



    $scope.onSubmit= function(){
      if($scope.vendor.identification_num == null){
        alert("Please enter your Identification Number.");
        return;
      }
      if($scope.vendor.provider_num == null){
        alert("Please enter your Tourist Business license Number.");
        return;
      }
      if($scope.vendor.phone_number == null){
        alert("Please enter your Phone number.");
        return;
      }
      else{
        Auth.signupVendor($scope.vendor)
            .then(function () {
              console.log('set as vendor!!!');
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
        console.log($scope.tabs);
      }
  }]);
