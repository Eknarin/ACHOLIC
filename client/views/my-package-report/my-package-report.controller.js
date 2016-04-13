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
            $scope.findAllPackageId($scope.myPackages);
            $scope.findAllPackageName($scope.myPackages);
            $scope.findSoldRatePerPackage(tran);
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

    // find all package id
    $scope.findAllPackageId = function(packages){
      $scope.packageIdArr = new Array(packages.length);
      for (var i = 0; i < $scope.packageIdArr.length; i++) {
        $scope.packageIdArr[i] = packages[i]._id; 
      }
    };

    // find all package name
    $scope.findAllPackageName = function(packages){
      $scope.packageNameArr = new Array(packages.length);
      for (var i = 0; i < $scope.packageIdArr.length; i++) {
        $scope.packageNameArr[i] = packages[i].name;
      }
    };
    // find sold amount of each package
    $scope.findSoldRatePerPackage = function(trans){
      $scope.packageSoldAmount = new Array($scope.packageIdArr.length);
      for (var i = 0; i < $scope.packageIdArr.length; i++) {      
        $scope.packageSoldAmount[i] = 0;
      };
      for (var i = 0; i < trans.length; i++) {
        for(var j=0; j < $scope.packageIdArr.length; j++){            
           if(trans[i].packages_id == $scope.packageIdArr[j]){                               
            $scope.packageSoldAmount[j] += 1;
           }
        }       
      }
    };
  }]);
