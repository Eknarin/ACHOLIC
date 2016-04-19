'use strict';

angular.module('acholic')
  .controller('MyTransactionCtrl',['$scope','$location','Transaction','PackageItem','Auth', function ($scope,$location,Transaction,PackageItem, Auth) {

  	$scope.receipts = [];
    $scope.packages = {};
    $scope.choosen = false;
    $scope.currentPack = "";
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.limit = 1;
    $scope.totalItems = 1;
    $scope.serial = "";
    $scope.serial_code = {};
    $scope.active =false;

  	Auth.getUser().then(function(res){
        $scope.user = res;
        PackageItem.myPackageAll({q: $scope.user._id}).$promise.then(function(pack){
          $scope.packages = pack;
          Transaction.queryTran({vendor_id: $scope.user._id,page:1}).$promise.then(function(res){
              $scope.receipts = res.docs;
              $scope.limit = res.limit;
              $scope.totalItems = res.total;
              $scope.loading = true;
          });
        });
   });

    $scope.choosePack = function(packageId){
      if(packageId == 0){
        $scope.choosen = false;
        Transaction.queryTran({vendor_id: $scope.user._id,page:1}).$promise.then(function(res){
              $scope.receipts = res.docs;
              $scope.limit = res.limit;
              $scope.totalItems = res.total;
          });
      }else{
        $scope.choosen = true;
        $scope.currentPack = packageId;
       Transaction.queryPack({vendor_id: $scope.user._id,page:1,package_id:packageId}).$promise.then(function(res){
              $scope.receipts = res.docs;
              $scope.limit = res.limit;
              $scope.totalItems = res.total;              
       });
     }
    };

        $scope.getPackge = function(package_id){
      for(var i = 0;i<$scope.packages.length ;i++){
        if($scope.packages[i]._id == package_id)
        {
          return $scope.packages[i];
        }
      }
    };

        $scope.pageChanged = function() {
      if($scope.choosen == true){
        Transaction.queryPack({vendor_id: $scope.user._id,page:$scope.currentPage,package_id:$scope.currentPack}).$promise.then(function(res){
              $scope.receipts = res.docs;
              $scope.limit = res.limit;
              $scope.totalItems = res.total;
        });
      }
      else{
         Transaction.queryTran({vendor_id: $scope.user._id,page:$scope.currentPage}).$promise.then(function(res){
            $scope.receipts = res.docs;
            $scope.limit = res.limit;
            $scope.totalItems = res.total;
          });
       }
    };




    $scope.checkSerial = function(){
      Transaction.serial({'serial':$scope.serial}).$promise.then(function(serial){
        if(serial._id)
         { 
          $scope.serial_code = serial;
          if($scope.serial_code.active_status)
            $scope.active = true;
          else
            $scope.active = false;
         }
        else
          {
            $scope.serial_code = {};
            $scope.active = false;
            console.log('no serial found!!');
          }
      });
    };

    $scope.activateSerial = function(){
      if($scope.serial_code._id)
      Transaction.serialActivate({'serial':$scope.serial}).$promise.then(function(serial){
        $scope.serial = "";
        $scope.serial_code = {};
        console.log('activated');
        location.reload();
      });
    };

    // $scope.choosePack = function(packageId){
    //   if(packageId == 0){
    //     $scope.choosen = false;
    //     Transaction.queryTran({vendor_id: $scope.user._id,page:1}).$promise.then(function(res){
    //           $scope.receipts = res.docs;
    //           $scope.limit = res.limit;
    //           $scope.totalItems = res.total;
    //       });
    //   }else{
    //     $scope.choosen = true;
    //     $scope.currentPack = packageId;
    //    Transaction.queryPack({vendor_id: $scope.user._id,page:1,package_id:packageId}).$promise.then(function(res){
    //           $scope.receipts = res.docs;
    //           $scope.limit = res.limit;
    //           $scope.totalItems = res.total;              
    //    });
    //  }
    // };

    // $scope.getPackge = function(package_id){
    //   for(var i = 0;i<$scope.packages.length ;i++){
    //     if($scope.packages[i]._id == package_id)
    //     {
    //       return $scope.packages[i];
    //     }
    //   }
    // };

    // $scope.pageChanged = function() {
    //   if($scope.choosen == true){
    //     Transaction.queryPack({vendor_id: $scope.user._id,page:$scope.currentPage,package_id:$scope.currentPack}).$promise.then(function(res){
    //           $scope.receipts = res.docs;
    //           $scope.limit = res.limit;
    //           $scope.totalItems = res.total;
    //     });
    //   }
    //   else{
    //      Transaction.queryTran({vendor_id: $scope.user._id,page:$scope.currentPage}).$promise.then(function(res){
    //         $scope.receipts = res.docs;
    //         $scope.limit = res.limit;
    //         $scope.totalItems = res.total;
    //       });
    //    }
    // };
    
    // get date
    $scope.getCreateDate = function(timeStamp){
      $scope.temp = new Date(timeStamp);
      $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();
      return $scope.createDate;
    };

    $scope.selectFolder = function(id){
      // $scope.activeButton(event);
      if(id == 0){
        $location.path("/my-package");
      }
      else if(id == 1){
        $location.path("/my-transaction");
      }
      else if(id == 2){
        $location.path("/my-package-report");
      }
    };
    $scope.activeSelectedButton = function(event){
      var activeButton = $(event.target);
        
      $('.transaction-filter-package-type').removeClass('active-transaction-filter-package-type');
      activeButton.addClass('active-transaction-filter-package-type');
    };

  }]);
