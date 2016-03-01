'use strict';
var myNav = angular.module('acholic');
  myNav.directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html',
      controller: ['$scope' , '$location', '$route','$uibModal' ,'Auth' ,function($scope , $location , $route ,$uibModal, Auth) {

        $scope.search = '';
      	$scope.searchPage = function(){
          var temp = $scope.search;
          $scope.search = '';
      		$location.path("/package").search({q: temp});
      	};
        
        $scope.openLogout = function(){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'directives/nav-bar/modal/modal-logout.html',
            controller: 'LogoutCtrl',
            size: 'lg'
          });
        }; 

        $scope.openLogin = function(){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'directives/nav-bar/modal/modal-login.html',
            controller: 'LoginCtrl',
            size: 'lg'
          }).result.then(function(res){
            console.log(res);
          });
        };

        $scope.openSignup = function(){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'directives/nav-bar/modal/modal-signup.html',
            controller: 'SignUpCtrl',
            size: 'lg'
          }).result.then(function(res){
            console.log(res);
          });
        };

      }],      
    };
  });
