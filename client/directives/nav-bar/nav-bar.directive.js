'use strict';
var myNav = angular.module('acholic');
  myNav.directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html',
      controller: ['$scope' , '$location', '$route' ,'Auth' ,function($scope , $location , $route ,$uibModal, Auth) {

        $scope.search = '';

      	$scope.searchPage = function(){
          var temp = $scope.search;
          $scope.search = '';
      		$location.path("/package").search({q: temp});
      	};

        $scope.hideModal = function(){
          $('#signup-modal').modal('hide');
        };
    
      }],      
    };
  });
  myNav.controller('ItemController', ['$scope','Auth',function ($scope, Auth) {
    var vm = this;

     $scope.showAlert = false;
     $scope.user = { email: 'test@test.com', password: 'test' };

     $scope.login = function () {
      $scope.showAlert = false;
          Auth.login($scope.user)
            .then(function () {
              $('#signin-modal').modal('hide');
            })
            .catch(function (err) {
              $scope.showAlert = true;
              vm.error = err;
            });
        };
  }]);
  myNav.controller('OutController', ['$scope','Auth','$location',function ($scope, Auth ,$location) {
    var vg = this;

     $scope.logout = function () {
          Auth.logout();
          $('#signout-modal').modal('hide');
          $location.path('/');
        };
  }]);
