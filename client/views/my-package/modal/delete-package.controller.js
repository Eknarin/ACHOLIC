'use strict';

angular.module('acholic')
  .controller('DeleteMyPackageModalCtrl',['$scope','$uibModalInstance', '$location','PackageItem','packageData', function ($scope, $uibModalInstance, $location,PackageItem,packageData) {
   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
  $scope.deletePackage = function(){
  	PackageItem.delete({id:packageData._id}).$promise.then(function(res){
      $uibModalInstance.close(packageData);
    });
  };
}]);
