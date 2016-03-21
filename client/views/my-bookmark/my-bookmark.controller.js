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

  	$scope.selectFolder = function(folderId, event){
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

      var bookMarkButton = $(event.target);
      
      $('.bookmark-folder-button').removeClass('bookmark-folder-button-active');
      bookMarkButton.addClass('bookmark-folder-button-active');
      
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
      console.log("UNBOOKMARK");
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
      resolve: {
        bookmarkData: item,
      }
    }).result.then(function(res){
      if(res)
      { 
        var index = $scope.bookmarkFolders.indexOf(res);
        $scope.bookmarkFolders.splice(index, 1);
         Bookmark.queryAlls({userId: $scope.user._id,page: 1}).$promise.then(function(book){
          $scope.bookmarks = book.docs;
          $scope.main_bookmark_total = book.total;
          $scope.limit = book.limit;
          $scope.totalItems = book.total;
          $scope.currentPage = book.page;
        });
      }
    });
  }; 

  $scope.go = function ( path ) {
	  	$location.path( path );
	};

  $scope.activeButton = function(event){
    
  };


  }]);