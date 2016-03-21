'use strict';

angular.module('acholic')
  .controller('MyBookmarkCtrl',['$scope','Bookmark','Auth', '$uibModal', function ($scope ,Bookmark ,Auth, $uibModal) {
  	$scope.user = {};
  	$scope.bookmarks = [];
  	$scope.loading = false;
  	$scope.main_bookmark_total = 0;
  	$scope.maxSize = 5;
  	$scope.selected_folder = 0;
  	
  	Auth.getUser().then(function(res){
  		$scope.user = res;
	    Bookmark.queryFolder({userId: $scope.user._id}).$promise.then(function(res){
	      $scope.bookmarkFolders = res;
	    });
	    Bookmark.queryAlls({userId: $scope.user._id,page: 1}).$promise.then(function(res){
	      $scope.bookmarks = res.docs;
	      $scope.main_bookmark_total = res.total;
		  $scope.limit = res.limit;
		  $scope.totalItems = res.total;
		  $scope.currentPage = res.page;
	      $scope.loading = true;
	    });
	 });

  	$scope.selectFolder = function(folderId){
  		$scope.selected_folder = folderId;
  		if(folderId == 0){
  			Bookmark.queryAlls({userId: $scope.user._id,page: 1}).$promise.then(function(res){
		      $scope.bookmarks = res.docs;
			  $scope.limit = res.limit;
			  $scope.totalItems = res.total;
			  $scope.currentPage = res.page;
		    });
  		}else{
	  		Bookmark.query({userId: $scope.user._id, folderId: folderId,page: 1}).$promise.then(function(res){
		      $scope.bookmarks = res.docs;
			  $scope.limit = res.limit;
			  $scope.totalItems = res.total;
			  $scope.currentPage = res.page;
		    });
	  	}
  	};

  	$scope.pageChanged = function() {
	   if($scope.selected_folder == 0){
  			Bookmark.queryAlls({userId: $scope.user._id,page: $scope.currentPage}).$promise.then(function(res){
		      $scope.bookmarks = res.docs;
			  $scope.limit = res.limit;
			  $scope.totalItems = res.total;
			  $scope.currentPage = res.page;
		    });
  		}else{
	  		Bookmark.query({userId: $scope.user._id, folderId: $scope.selected_folder,page: $scope.currentPage}).$promise.then(function(res){
		      $scope.bookmarks = res.docs;
			  $scope.limit = res.limit;
			  $scope.totalItems = res.total;
			  $scope.currentPage = res.page;
		    });
	  	}
	};

	$scope.setPage = function (pageNo) {
	   $scope.currentPage = pageNo;
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
    	//console.log("A");
	  	$location.path( path );
	};
  }]);