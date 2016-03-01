'use strict';

angular.module('acholic')
  .controller('LogoutCtrl',['$scope','$rootScope','$uibModalInstance','Auth', function ($scope , $rootScope , $uibModalInstance ,Auth) {
     $scope.logout = function () {
          Auth.logout();
          $uibModalInstance.close($rootScope._user);
        };

     $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
}]);

