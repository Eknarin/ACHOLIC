'use strict';

angular.module('acholic')
  .controller('PackageCtrl',['$scope',function ($scope) {
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

  }]);
