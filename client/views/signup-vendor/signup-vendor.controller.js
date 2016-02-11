'use strict';

angular.module('acholic')
  .controller('SignupVendorCtrl', function ($scope) {

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
  });
