'use strict';

angular.module('acholic')
  .controller('SignupVendorCtrl',['$scope', 'Auth','$location','$rootScope', function ($scope , Auth , $location,$rootScope) {
    $scope.vendor = {};
    $scope.vendor.userId = $rootScope._user._id;

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
