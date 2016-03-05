'use strict';

angular.module('acholic')
  .controller('MyBookmarkCtrl',['$scope','Bookmark','$rootScope', function ($scope ,Bookmark ,$rootScope) {
  	$scope.user = $rootScope._user;
  	$scope.bookmarks = [];
  	$scope.loading = false;
  	
  	Bookmark.query({q: $scope.user._id}).$promise.then(function(res){
      $scope.bookmarks = res;
      $scope.loading = true;
      console.log($scope.bookmarks);
      // console.log($scope.bookmarks[0].packageId.rating);
    });

    $scope.unBookmark = function(bookmark){
    	bookmark.$delete().then(function(res){
    		var index = $scope.bookmarks.indexOf(bookmark);
			$scope.bookmarks.splice(index, 1);
    		console.log('unlike'+res);
    	});
    };
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
  }]);