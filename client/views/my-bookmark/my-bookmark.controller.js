'use strict';

angular.module('acholic')
  .controller('MyBookmarkCtrl',['$scope','Bookmark','Auth', '$uibModal', function ($scope ,Bookmark ,Auth, $uibModal) {
  	$scope.user = {};
  	$scope.bookmarks = [];
  	$scope.loading = false;
  	
  	Auth.getUser().then(function(res){
  		$scope.user = res;
	    Bookmark.queryFolder({userId: $scope.user._id}).$promise.then(function(res){
	      $scope.bookmarkFolders = res;
	    });
	 });

  	$scope.selectFolder = function(folderId){
  		Bookmark.query({userId: $scope.user._id, folderId: folderId}).$promise.then(function(res){
	      $scope.bookmarks = res;
	      $scope.loading = true;
	    });
  	};
  	
    $scope.unBookmark = function(bookmark){
    	bookmark.$delete().then(function(res){
    		var index = $scope.bookmarks.indexOf(bookmark);
			$scope.bookmarks.splice(index, 1);
			for(var i = 0;i<$scope.bookmarkFolders.length ;i++){
				if($scope.bookmarkFolders[i]._id == bookmark.folder)
				{
					$scope.bookmarkFolders[i].total -= 1;
					break;
				}
			}
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
	$scope.openEditBookmarkFolderModal = function(item){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/my-bookmark/modal/modal-edit-bookmark-folder.html',
            controller: 'EditBookmarkFolderModalCtrl',
            size: 'md',
           
          }).result.then(function(res){
            
          });
        }; 
    $scope.go = function ( path ) {
    	console.log("A");
	  	$location.path( path );
	};
  }]);