'use strict';
var myNav = angular.module('acholic');
  myNav.directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html',
      controller: ['$scope' , '$location', '$route','$uibModal' ,'$rootScope',function($scope , $location , $route ,$uibModal ,$rootScope ) {

        $scope.search = '';
        $scope.user = {};

        $rootScope.$watch('_user',function(){
          $scope.user = $rootScope._user;
        });

      	$scope.searchPage = function(){
          var temp = $scope.search;
      		$location.path("/package").search({q: temp});
      	};

        $scope.refreshUser = function(){
          $scope.user = Auth.getUser().then(function(res){
            $scope.user = res;
          });
        };
        
        $scope.openLogout = function(){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'directives/nav-bar/modal/modal-logout.html',
            controller: 'LogoutCtrl',
            size: 'lg'
          }).result.then(function(res){
            $scope.user = {};
            $location.path('/');
          });
        }; 

        $scope.openLogin = function(){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'directives/nav-bar/modal/modal-login.html',
            controller: 'LoginCtrl',
            size: 'lg'
          }).result.then(function(res){
            $scope.user = res;
          });
        };

        $scope.openSignup = function(){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'directives/nav-bar/modal/modal-signup.html',
            controller: 'SignUpCtrl',
            size: 'lg'
          }).result.then(function(res){
            
          });
        };

      }] 
    };
  });
