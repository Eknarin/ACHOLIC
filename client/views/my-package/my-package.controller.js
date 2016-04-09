'use strict';

angular.module('acholic')
  .controller('MyPackageCtrl',['$scope','$location','PackageItem','Auth', '$uibModal', function ($scope, $location, PackageItem,Auth, $uibModal) {
  	$scope.user = {};
  	$scope.package = {};
    $scope.rating_check = false;
    $scope.create_check = false;
    $scope.rating_filter = 0;
    $scope.create_filter = 0;
    $scope.loading = false;

  	Auth.getUser().then(function(res){
  		$scope.user = res;
  		PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
	  		$scope.package = res.docs;
         $scope.loading = true;
  		});
  	});

    $scope.$watch('rating_check', function() {
      if($scope.loading)
      if($scope.rating_check){
        $scope.rating_filter = -1;
        PackageItem.myPackage({rating:$scope.rating_filter, q: $scope.user._id , page: 1}).$promise.then(function(res){
          $scope.package = res.docs;
        });
      } else {
        $scope.rating_filter = 0;
        PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
          $scope.package = res.docs;
        });
      };
    });

    $scope.$watch('create_check', function() {
      if($scope.loading)
      if($scope.create_check){
        $scope.create_filter = -1;
        PackageItem.myPackage({create:$scope.create_filter, q: $scope.user._id , page: 1}).$promise.then(function(res){
          $scope.package = res.docs;
        });
      } else {
        $scope.create_filter = 0;
        PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
          $scope.package = res.docs;
        });
      }
    });

    $scope.queryFilter = function(){
      if($scope.rating_check)
      PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
        $scope.package = res.docs;
      });
      if($scope.create_check)
      PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
        $scope.package = res.docs;
      });
    };

    $scope.getCreateDate = function(timeStamp){
      $scope.temp = new Date(timeStamp);
      $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();   
      return $scope.createDate;
    }
    

  $scope.openEditMyPackageModal = function(item){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/my-package/modal/modal-edit-package.html',
            controller: 'EditMyPackageModalCtrl',
            size: 'md',
            resolve: {
              packageData: item
            }
          }).result.then(function(res){
            
          });
  };
  $scope.rate = 0;
  $scope.getStar = function(num) {
    if(num == null){
      $scope.rate = 0;
    }
    else{     
      $scope.rate = num;
    }
    return new Array(Math.floor($scope.rate));   
  };

  $scope.Math = window.Math;
    $scope.yStar = 0;

  $scope.getWhite = function(val){
    if(val == null){
      $scope.yStar = 0;
    }
    else{
      $scope.yStar = Math.round(val);
    }
    return new Array(5-$scope.yStar);
  };

  $scope.selectFolder = function(id, event){
    $scope.activeButton(event);
    if(id == 1){
      $location.path("/my-transaction");
    }

  };

  $scope.activeButton = function(event){
    var bookMarkButton = $(event.target);
    
    $('.bookmark-folder-button').removeClass('bookmark-folder-button-active');
    bookMarkButton.addClass('bookmark-folder-button-active');
  };
   
  }]);

