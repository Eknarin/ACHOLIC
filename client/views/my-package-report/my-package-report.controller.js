'use strict';

angular.module('acholic')
  .controller('MyPackageReportCtrl',['$scope','$location','PackageItem','Auth','Transaction',function ($scope, $location,PackageItem,Auth,Transaction) {
  	
  	Auth.getUser().then(function(res){
  		$scope.user = res;
  		console.log('User Data');
  		console.log(res);
  		PackageItem.myPackageAll({q: $scope.user._id}).$promise.then(function(pack){
          $scope.myPackages = pack;
          console.log('All my packages');
          console.log(pack);
          Transaction.queryTranAll({vendor_id: $scope.user._id,page:1}).$promise.then(function(tran){
          	console.log('All the transactions from all packages');
          	console.log(tran);
          });
        });
  	});
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
    

  }]);
