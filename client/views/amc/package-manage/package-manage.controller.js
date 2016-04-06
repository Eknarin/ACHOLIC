'use strict';

angular.module('acholic')
  .controller('AmcPackageCtrl',['$scope','PackageItem', function ($scope,PackageItem) {
  	$scope.loading = false;
  	$scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.limit = 1;
    $scope.totalItems = 1;

  	PackageItem.query({page: $scope.currentPage}).$promise.then(function(res){
  		$scope.packages = res.docs;
  		$scope.users = res.docs;
  		$scope.limit = res.limit;
    	$scope.totalItems = res.total;
    	$scope.dateChange();
  		$scope.loading = true;
  	});

  	$scope.dateChange = function(item){
  		for(var i = 0;i<$scope.packages.length ;i++){
	  		$scope.temp = new Date($scope.packages[i].created_at);
	  		$scope.packages[i].created_at = $scope.temp.getDate() +"/"+
  				$scope.temp.getMonth()+"/"+$scope.temp.getFullYear();
  		}
  	};

  	 $scope.pageChanged = function() {
	    PackageItem.query({page: $scope.currentPage}).$promise.then(function(res){
	        $scope.packages = res.docs;
	        $scope.limit = res.limit;
	        $scope.totalItems = res.total;
	        $scope.dateChange();
	      });
	  };

	  $scope.setPage = function (pageNo) {
	     $scope.currentPage = pageNo;
	  };

	  $scope.removePackage = function(item){
	  	PackageItem.delete({id: item._id}).$promise.then(function(res){
	  		var index = $scope.packages.indexOf(item);
			$scope.packages.splice(index, 1);
	  	});
	  };

	  $scope.editPackage = function(item){
	  	console.log('edit');
	  	console.log(item);
	  };
  }]);
