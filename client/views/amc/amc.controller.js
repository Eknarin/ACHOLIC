'use strict';

angular.module('acholic')
  .controller('AmcCtrl',['$scope','$rootScope','Auth','$location',function ($scope,$rootScope,Auth,$location) {
    $rootScope.isVisible = false;
    $scope.showAdmin = false;
    $scope.showAlert = false;
    $scope.loading = false;
    $scope.user = { email: '', password: '' };

    Auth.getUser().then(function(res){
  		$scope.userId = res;
  		if(res.role == 'Admin')
  			$location.path('/amc/main');
  		else
  			Auth.logout();
  	}).catch(function(err) {

    });	

  	$scope.login = function () {
      $scope.showAlert = false;
      $scope.showAdmin = false;
          Auth.login($scope.user)
            .then(function (res) {
            	if(res.role != 'Admin'){
            		Auth.logout();
            		$scope.showAdmin = true;
            	}else{
            		$location.path('/amc/main');
            	}
            })
            .catch(function (err) {
              $scope.showAlert = true;
        });
     };

  }]);
