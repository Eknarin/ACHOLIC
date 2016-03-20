'use strict';

angular.module('acholic')
  .controller('ReceiptCtrl',['$scope','$rootScope','$location', '$uibModal', function ($scope , $rootScope , $location, $uibModal) {
  
  $scope.openReceiptInfoModal = function(item){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/my-receipt/modal/modal-receipt-info.html',
            controller: 'ReceiptInfoModalCtrl',
            size: 'md',
           
          }).result.then(function(res){
            
          });
        }; 
}]);