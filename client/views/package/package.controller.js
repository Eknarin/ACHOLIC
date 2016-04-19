'use strict';

angular.module('acholic')
  .controller('PackageCtrl',['$scope','PackageItem','$location' ,'itemData','Auth','Bookmark','Compare', '$uibModal',function ($scope , PackageItem , $location , itemData ,Auth, Bookmark,Compare, $uibModal) {
  
  $scope.packages = itemData.docs;  
  $scope.maxSize = 5;
  $scope.limit = itemData.limit;
  $scope.totalItems = itemData.total;
  $scope.currentPage = itemData.page;
  $scope.loading = false;
  $scope.chooseType = 'all';
  
  Auth.getUser().then(function(res){
   $scope.user = res;
  }).catch(function () {
      $scope.loading = true;
  });

  $scope.activeSelectedButton = function(event){
    var activeButton = $(event.target);
      
    $('.select-package-type-button').removeClass('select-package-type-button-active');
    activeButton.addClass('select-package-type-button-active');
  };


  $scope.checkCompare = function(packid){
    var com = Compare.getCompare();
    for(var i = 0; i < com.length; i++){
      if(packid == com[i]){
        return true;
        break;
      }
    }
    return false;
  };

  $scope.unlike = function(packageId){
    if(packageId.bookmark != null){
      packageId.bookmark.$delete().then(function(res){
        packageId.bookmark = null;
      });
    }
    else{
      $scope.openBookmarkModal(packageId);
    }
  };

  $scope.addCompare = function(packageId){
    Compare.addItem(packageId);
  };
  // get package create date
  $scope.getCreateDate = function(timeStamp){
    $scope.temp = new Date(timeStamp);
    $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();
    return $scope.createDate;
  }


	$scope.slider = {
	  min: 0,
	  max: 10000,
	  options: {
	    floor: 0,//should find min price of package
	    ceil: 10000//should find max price of package
	  }
	};

  $scope.peopleslider = {
    min: 0,
    max: 10,
    options: {
      floor: 0,//should find min price of package
      ceil: 10//should find max price of package
    }
  };

  // $scope.rate = 0;
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
	
	$scope.rotate = function(){
		$('#expandButt').toggleClass('rotate-180deg');
  };

 
  $scope.openBookmarkModal = function(item){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/package/modal/modal-bookmark.html',
      controller: 'BookmarkModalCtrl',
      size: 'md',
      resolve: {
        folderData:['Bookmark',function(Bookmark){
          return Bookmark.queryFolder({userId: $scope.user._id}).$promise;
        }],
        userData: $scope.user,
        packageData: function () {
          return item;
        }
      }
    }).result.then(function(res){
        if(res)
          for(var i = 0 ; i<$scope.packages.length ;i++){
            if($scope.packages[i]._id == res.packageId){
              $scope.packages[i].bookmark = res;
              break;
            }
          }
        });
  };
  $scope.openAddToCartModal = function(item){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/package/modal/modal-addToCart.html',
      controller: 'AddToCartModalCtrl',
      size: 'md',
      resolve: {
        packageData:['PackageItem', function(PackageItem){
          return PackageItem.query({id : item}).$promise;
          }] ,
          userData: $scope.user
        }
        }).result.then(function(res){
            $scope.reloadCart();
          });
    };

  }]);
