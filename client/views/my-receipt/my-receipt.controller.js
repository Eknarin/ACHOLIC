'use strict';

angular.module('acholic')
  .controller('ReceiptCtrl',['$scope','$rootScope','$location', '$uibModal','Transaction','Auth', function ($scope , $rootScope , $location, $uibModal,Transaction,Auth) {
  $scope.loading = false;
  $scope.receipts = [];
  $scope.resOrder = [];
  $scope.currentPage = 1;
  $scope.maxSize = 5;
  $scope.limit = 1;
  $scope.totalItems = 1;
  $scope.create_check = false;
  $scope.price_check = false;
  $scope.rating_filter = 0;
  $scope.price_filter = 0;

  $scope.pageChanged = function() {
     if($scope.price_check){
         Transaction.query({price:$scope.price_filter,user_id:$scope.user._id,page:$scope.currentPage}).$promise.then(function(res){
          $scope.receipts = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
        });
      }else if($scope.create_check){
        Transaction.query({create:$scope.create_filter,user_id:$scope.user._id,page:$scope.currentPage}).$promise.then(function(res){
          $scope.receipts = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
      });
      }
      else{
        Transaction.query({user_id:$scope.user._id,page:$scope.currentPage}).$promise.then(function(res){
          $scope.receipts = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
      });
      }
  };


    $scope.$watch('price_check', function() {
      if($scope.price_check){
        $scope.price_filter = -1;
        Transaction.query({price:$scope.price_filter,user_id:$scope.user._id,page:1}).$promise.then(function(res){
          $scope.receipts = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
      });
      } else {
        $scope.price_filter = 0;
        Transaction.query({user_id: $scope.user._id,page:1}).$promise.then(function(res){
          $scope.receipts = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
      });
      };
    });

    $scope.$watch('create_check', function() {
      if($scope.create_check){
        $scope.create_filter = -1;
         Transaction.query({create:$scope.create_filter,user_id:$scope.user._id,page:1}).$promise.then(function(res){
          $scope.receipts = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
      });
      } else {
        $scope.create_filter = 0;
        $scope.create_filter = -1;
         Transaction.query({user_id:$scope.user._id,page:1}).$promise.then(function(res){
          $scope.receipts = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
      });
      }
    });

  Auth.getUser().then(function(res){
      $scope.user = res;
      Transaction.query({user_id: $scope.user._id,page:1}).$promise.then(function(res){
        $scope.receipts = res.docs;
        for (var i = 0; i < $scope.receipts.length; i++) {
          $scope.resOrder.push({
            key: $scope.receipts[i]._id,
            value: i+1
          });
        };
        $scope.limit = res.limit;
        $scope.totalItems = res.total;
        $scope.loading = true;
      });
   });

  $scope.getOrder = function(id){
    for (var i = 0; i < $scope.resOrder.length; i++) {
      if($scope.resOrder[i].key == id)
        return $scope.resOrder[i].value;
    };
    return 0;
  };

  $scope.openReceiptInfoModal = function(item){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/my-receipt/modal/modal-receipt-info.html',
            controller: 'ReceiptInfoModalCtrl',
            size: 'lg',
            resolve:{
              itemData: item
            }
          }).result.then(function(res){
            
          });
  }; 


  $scope.setPage = function (pageNo) {
     $scope.currentPage = pageNo;
  };
  // get date
  $scope.getCreateDate = function(timeStamp){
    $scope.temp = new Date(timeStamp);
    $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();
    return $scope.createDate;
  }
}]);