'use strict';

angular.module('acholic')
  .controller('ReceiptInfoModalCtrl',['$scope','$uibModalInstance','Transaction', '$location','itemData','PackageItem', function ($scope, $uibModalInstance,Transaction, $location,itemData,PackageItem) {
   $scope.transactions = itemData.transaction_id;
   $scope.receipt = itemData;
   $scope.pacName = [];
   $scope.showCal = false;
   $scope.done = false;
   $scope.fail = false;

   for (var i = 0; i < $scope.transactions.length; i++) {
     PackageItem.query({id : $scope.transactions[i].packages_id[0]}).$promise.then(function(res){
      $scope.pacName.push(res.name);
    });
   };

   $scope.closeModal = function(){
      $uibModalInstance.close();
  };

  $scope.checkDate = function(item){
    $scope.showCal = true;
    $scope.temp_pack = item;
  };

  $scope.addDate = function(time){
    var index = null;
    for(var i = 0; i < $scope.transactions.length; i++) {
        if($scope.transactions[i] === $scope.temp_pack)
         {
          index = i;
          break;
         }
    }
    PackageItem.query({id : $scope.temp_pack.packages_id[0]}).$promise.then(function(item){
      $scope.pack = item;
      console.log(time);
        Transaction.checkTran({'packagesId': $scope.temp_pack.packages_id[0],'confirm_at': time}).$promise.then(function(res){
          if(res.length < $scope.pack.amount_limit)
          { 
            if(time)
             {
              $scope.transactions[index].confirm_at = time;
              $scope.showCal = false;
              Transaction.update($scope.transactions[index]).$promise.then(function(result){
                console.log('saved');
                $scope.isBook = true;
              });
             }
          }
          else
          {
             $scope.showCal = false;
            console.log('Overlimit');
            $scope.isBook = false;
          }
           $scope.done = true;
        });
    });
  };

  $scope.isBook = false;

  $scope.closeNoti = function(){
    $scope.isBook = false;
    $scope.done = false;
  }

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