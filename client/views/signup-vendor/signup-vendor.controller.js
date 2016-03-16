'use strict';

angular.module('acholic')
  .controller('SignupVendorCtrl',['$scope', 'Auth','$location', function ($scope , Auth , $location) {
    $scope.user = {};

    $scope.onSubmit= function(){
      //submit more information to user
      //customer -> vendor

      // console.log($scope.user);
      // Auth.signupVendor($scope.user)
      //     .then(function () {
      //       $location.path('/');
      //     })
      //     .catch(function (err) {
      //       console.log(err);
      //     });
    };

    angular.extend(this, {
      name: 'SignupVendorCtrl',
      
       signup: function () {
        Auth.signup(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            vm.error = err;
          });
      }
    });
    
      $scope.tabs = ["active", "", "", ""];
      $scope.activeTab = function(goto){
        $scope.tabs = ["", "", "", ""];
        $scope.tabs[goto] = "active";
        console.log($scope.tabs);
      }
  }]);
