'use strict';

angular.module('acholic')
  .controller('LogoutCtrl',['$scope','$rootScope','$uibModalInstance','$facebook','Auth', function ($scope , $rootScope , $uibModalInstance,$facebook ,Auth) {
     $scope.logout = function () {
          Auth.logout();
          $facebook.getLoginStatus().then(function(res){
          	if(res.status == "connected")
          	$facebook.logout();
          });
          $uibModalInstance.close($rootScope._user);
          location.reload();
        };

     $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
}]);

