'use strict';

angular.module('acholic')
  .controller('ReceiptCtrl',['$scope','$rootScope','$location', '$uibModal','Transaction','Auth', function ($scope , $rootScope , $location, $uibModal,Transaction,Auth) {
  $scope.loading = false;
  $scope.receipts = [];
  $scope.currentPage = 1;
  $scope.maxSize = 5;
  $scope.limit = 1;
  $scope.totalItems = 1;

  Auth.getUser().then(function(res){
      $scope.user = res;
      Transaction.query({user_id: $scope.user._id,page:$scope.currentPage}).$promise.then(function(res){
        $scope.receipts = res.docs;
        $scope.limit = res.limit;
        $scope.totalItems = res.total;
        $scope.loading = true;
      });
   });
  console.log($scope.receipts);
  $scope.openReceiptInfoModal = function(item){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/my-receipt/modal/modal-receipt-info.html',
            controller: 'ReceiptInfoModalCtrl',
            size: 'md',
            resolve:{
              itemData: item
            }
          }).result.then(function(res){
            
          });
  }; 

  $scope.pageChanged = function() {
    Transaction.query({user_id: $scope.user._id,page: $scope.currentPage}).$promise.then(function(res){
        $scope.receipts = res.docs;
        $scope.limit = res.limit;
        $scope.totalItems = res.total;
      });
  };

  $scope.setPage = function (pageNo) {
     $scope.currentPage = pageNo;
  };
}]);