'use strict';

angular.module('acholic')
  .controller('MyBookmarkCtrl',['$scope','Bookmark','$rootScope', function ($scope ,Bookmark ,$rootScope) {
  	$scope.user = $rootScope._user;
  	$scope.bookmarks = {};
  	$scope.loading = false;
  	
  	Bookmark.query({q: $scope.user._id}).$promise.then(function(res){
      $scope.bookmarks = res;
      $scope.loading = true;
      console.log($scope.bookmarks);
    });

    $scope.unBookmark = function(bookmark){
    	bookmark.$delete().then(function(res){
    		console.log('unlike'+res);
    	});
    };
  }]);