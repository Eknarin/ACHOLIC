'use strict';

angular.module('acholic')
  .controller('MyPackageCtrl',['$scope','PackageItem','Auth', '$uibModal', function ($scope, PackageItem,Auth, $uibModal) {
  	$scope.user = {};
  	$scope.package = {};
  	Auth.getUser().then(function(res){
  		$scope.user = res;
  		PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
	  		$scope.package = res.docs;
	  		console.log($scope.package);
  		});
  	});
    // get package create date
    $scope.getCreateDate = function(timeStamp){
      $scope.temp = new Date(timeStamp);
      $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();   
      return $scope.createDate;
    }
     $scope.rate = 0;
    $scope.getStar = function(num) {
    if(num == null){
      $scope.rate = 0;
    }
    else{
      $scope.rate = num/2;
    }
        
      return new Array(Math.floor($scope.rate));   
  };
  
  $scope.getWhite = function(val){
    if(val == null){
      $scope.yStar = 0;
    }
    else{
      if((val/2)%1 == 0){
        $scope.yStar = Math.floor(val/2);
      } else{
        if(((val)/2)%1 >= 0.5){
          $scope.yStar = Math.floor(val/2)+1;
        }else{
          $scope.yStar = Math.floor(val/2);
        }
      }
    }
    return new Array(5-$scope.yStar);
  };  

  $scope.openEditMyPackageModal = function(item){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/my-package/modal/modal-edit-package.html',
            controller: 'EditMyPackageModalCtrl',
            size: 'md',
           
          }).result.then(function(res){
            
          });
        }; 
  }]);
