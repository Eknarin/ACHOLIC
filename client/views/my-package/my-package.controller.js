'use strict';

angular.module('acholic')
  .controller('MyPackageCtrl',['$scope','$location','PackageItem','Auth', '$uibModal', 'Transaction', function ($scope, $location, PackageItem,Auth, $uibModal, Transaction) {
  	$scope.user = {};
  	$scope.package = {};
    $scope.rating_check = false;
    $scope.create_check = false;
    $scope.rating_filter = 0;
    $scope.create_filter = 0;
    $scope.loading = false;
    $scope.limit = 0;
    $scope.totalItems = 0;
    $scope.currentPage = 1;

  	Auth.getUser().then(function(res){
  		$scope.user = res;
  		PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
	  		 $scope.package = res.docs;
         $scope.loading = true;
         $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
  		});
  	});

    $scope.pageChanged = function() {
     if($scope.rating_check){
         PackageItem.myPackage({rating:$scope.rating_filter, q: $scope.user._id , page: $scope.currentPage}).$promise.then(function(res){
          $scope.package = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
        });
      }else if($scope.create_check){
        PackageItem.myPackage({create:$scope.create_filter, q: $scope.user._id , page: $scope.currentPage}).$promise.then(function(res){
          $scope.package = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
        });
      }
      else{
        PackageItem.myPackage({q: $scope.user._id , page: $scope.currentPage}).$promise.then(function(res){
          $scope.package = res.docs;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
        });
      }
  };

    $scope.$watch('rating_check', function() {
      if($scope.loading)
      if($scope.rating_check){
        $scope.rating_filter = -1;
        PackageItem.myPackage({rating:$scope.rating_filter, q: $scope.user._id , page: 1}).$promise.then(function(res){
          $scope.package = res.docs;
           $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
        });
      } else {
        $scope.rating_filter = 0;
        PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
          $scope.package = res.docs;
           $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
        });
      };
    });

    $scope.$watch('create_check', function() {
      if($scope.loading)
      if($scope.create_check){
        $scope.create_filter = -1;
        PackageItem.myPackage({create:$scope.create_filter, q: $scope.user._id , page: 1}).$promise.then(function(res){
          $scope.package = res.docs;
           $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
        });
      } else {
        $scope.create_filter = 0;
        PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
          $scope.package = res.docs;
           $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
        });
      }
    });

    $scope.queryFilter = function(){
      if($scope.rating_check)
      PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
        $scope.package = res.docs;
         $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
      });
      if($scope.create_check)
      PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
        $scope.package = res.docs;
         $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = res.page;
          $scope.soldEachPack = new Array($scope.package.length);
          for (var i = 0; i < $scope.package.length; i++) {
            $scope.choosePack($scope.package[i]._id, i);
          };
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
  $scope.openDeleteMyPackageModal = function(item){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/my-package/modal/delete-package.html',
            controller: 'DeleteMyPackageModalCtrl',
            size: 'md',
            resolve: {
              packageData: item
            }
          }).result.then(function(res){
            var index = $scope.package.indexOf(res);
            $scope.package.splice(index, 1);
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
    else if(id == 2){
      $location.path("/my-package-report");
    }

  };

  $scope.activeButton = function(event){
    var bookMarkButton = $(event.target);
    
    $('.bookmark-folder-button').removeClass('bookmark-folder-button-active');
    bookMarkButton.addClass('bookmark-folder-button-active');
  };

  $scope.choosePack = function(packageId, index){
     Transaction.queryPack({vendor_id: $scope.user._id,package_id:packageId}).$promise.then(function(res){
        $scope.soldEachPack[index] = res.total;
    });

  };
   
  }]);

