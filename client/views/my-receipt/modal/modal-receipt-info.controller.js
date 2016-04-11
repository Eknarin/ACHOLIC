'use strict';

angular.module('acholic')
  .controller('ReceiptInfoModalCtrl',['$scope','$uibModalInstance', '$location','itemData', function ($scope, $uibModalInstance, $location,itemData) {
   $scope.transactions = itemData.transaction_id;
   $scope.receipt = itemData;
   console.log($scope.transactions);
   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
  // get date
  $scope.getCreateDate = function(timeStamp){
    $scope.temp = new Date(timeStamp);
    $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();
    return $scope.createDate;
  }
  // $scope.openEditPage = function(){
  // 	$location.path('/edit-package');
  // 	$uibModalInstance.close();
  // };
}]);