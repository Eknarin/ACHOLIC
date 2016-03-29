'use strict';

angular.module('acholic')
  .controller('EditMyPackageModalCtrl',['$scope','$uibModalInstance', '$location','packageData', function ($scope, $uibModalInstance, $location,packageData) {
   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
  $scope.openEditPage = function(){
  	$location.path('/edit-package/'+packageData._id);
  	$uibModalInstance.close();
  };
}]);
