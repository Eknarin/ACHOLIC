'use strict';

angular.module('acholic')
  .controller('ReceiptInfoModalCtrl',['$scope','$uibModalInstance', '$location','itemData', function ($scope, $uibModalInstance, $location,itemData) {
   $scope.transactions = itemData.transaction_id;
   console.log($scope.transactions);
   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
  // $scope.openEditPage = function(){
  // 	$location.path('/edit-package');
  // 	$uibModalInstance.close();
  // };
}]);