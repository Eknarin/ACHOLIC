'use strict';

angular.module('acholic')
  .controller('ReceiptCtrl',['$scope','$rootScope','$location', '$uibModal','Transaction','Auth', function ($scope , $rootScope , $location, $uibModal,Transaction,Auth) {
  $scope.loading = false;
  $scope.receipts = [];
  Auth.getUser().then(function(res){
      $scope.user = res;
      Transaction.query({user_id: $scope.user._id}).$promise.then(function(res){
        $scope.receipts = res;
        $scope.loading = true;
      });
   });

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
}]);