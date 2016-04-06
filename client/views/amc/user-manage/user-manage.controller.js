'use strict';

angular.module('acholic')
  .controller('AmcUserCtrl',['$scope','User', function ($scope,User) {
  	$scope.users = [];
  	$scope.loading = false;
  	$scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.limit = 1;
    $scope.totalItems = 1;

  	User.query({page: $scope.currentPage}).$promise.then(function(res){
  		$scope.users = res.docs;
  		$scope.limit = res.limit;
    	$scope.totalItems = res.total;
  		$scope.dateChange();
  		$scope.loading = true;
  	});

  	$scope.dateChange = function(item){
  		for(var i = 0;i<$scope.users.length ;i++){
	  		$scope.temp = new Date($scope.users[i].created_at);
	  		$scope.users[i].created_at = $scope.temp.getDate() +"/"+
  				$scope.temp.getMonth()+"/"+$scope.temp.getFullYear();
  		}
  	};

  	 $scope.pageChanged = function() {
	    User.query({page: $scope.currentPage}).$promise.then(function(res){
	        $scope.users = res.docs;
	        $scope.limit = res.limit;
	        $scope.totalItems = res.total;
	        $scope.dateChange();
	      });
	  };

	  $scope.setPage = function (pageNo) {
	     $scope.currentPage = pageNo;
	  };

	  $scope.removeUser = function(user){
	  	User.delete({id:user._id}).$promise.then(function(res){
	  		var index = $scope.users.indexOf(user);
			$scope.users.splice(index, 1);
	  	});
	  };
  }]);
