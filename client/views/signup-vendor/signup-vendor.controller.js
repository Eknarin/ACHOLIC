'use strict';

angular.module('acholic')
  .controller('SignupVendorCtrl',['$scope', 'Auth','$location', function ($scope , Auth , $location) {
    $scope.vendor = {};
    Auth.getUser().then(function(res){
      $scope.vendor.userId = res._id;
      $scope.vendor.email = res.email;
    });

    $scope.onSubmit= function(){
      Auth.signupVendor($scope.vendor)
          .then(function () {
            console.log('set as vendor!!!');
            $location.path('/');
          })
          .catch(function (err) {
            console.log(err);
      });
    };
    
      $scope.tabs = ["active", "", "", ""];
      $scope.activeTab = function(goto){
        $scope.tabs = ["", "", "", ""];
        $scope.tabs[goto] = "active";
        console.log($scope.tabs);
      }
  }]);
