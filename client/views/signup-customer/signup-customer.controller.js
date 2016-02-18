'use strict';

angular.module('acholic')
  .controller('SignupCustomerCtrl',['$scope' , 'Auth', '$location', function ($scope , Auth , $location) {
    $scope.user = {};

    $scope.onSubmit= function(){
      console.log($scope.user);
      Auth.signupCustomer($scope.user)
          .then(function () {
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
