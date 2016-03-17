'use strict';

angular.module('acholic')
  .controller('EditMyPackageModalCtrl',['$scope','$uibModalInstance', '$location', function ($scope, $uibModalInstance, $location) {
   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
  $scope.openEditPage = function(){
  	$location.path('/edit-package');
  	$uibModalInstance.close();
  };
}]);
