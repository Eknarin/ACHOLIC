'use strict';

angular.module('acholic')
  .controller('ReceiptInfoModalCtrl',['$scope','$uibModalInstance', '$location','itemData','PackageItem', function ($scope, $uibModalInstance, $location,itemData,PackageItem) {
   $scope.transactions = itemData.transaction_id;
   $scope.receipt = itemData;
   $scope.pacName = [];
   
   for (var i = 0; i < $scope.transactions.length; i++) {
     PackageItem.query({id : $scope.transactions[i].packages_id[0]}).$promise.then(function(res){
      $scope.pacName.push(res.name);
    });
   };

   $scope.closeModal = function(){
      $uibModalInstance.close();
  };


  // get date
  $scope.getCreateDate = function(timeStamp){
    $scope.temp = new Date(timeStamp);
    $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();
    return $scope.createDate;
  };

  // $scope.openEditPage = function(){
  // 	$location.path('/edit-package');
  // 	$uibModalInstance.close();
  // };
}]);