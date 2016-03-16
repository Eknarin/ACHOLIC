'use strict';

angular.module('acholic')
  .controller('EditMyPackageModalCtrl',['$scope','$uibModalInstance', function ($scope, $uibModalInstance) {
   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
}]);
