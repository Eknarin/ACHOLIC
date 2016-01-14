'use strict';

angular.module('acholic')
  .controller('PackageCtrl',['$scope','PackageItem',function ($scope , PackageItem) {
  	$scope.packages = PackageItem.query();
	$scope.slider = {
	  min: 1,
	  max: 5,
	  options: {
	    floor: 0,
	    ceil: 20
	  }
	};
    angular.extend(this, {
      name: 'PackageCtrl'
    });
    $scope.n = 5;
    $scope.price = 1000;
    $scope.getNumber = function(num) {
	    return new Array(num);   
	};

  }]);
