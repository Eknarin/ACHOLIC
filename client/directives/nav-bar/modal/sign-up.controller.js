'use strict';

angular.module('acholic')
  .controller('SignUpCtrl',['$scope','$rootScope','Auth','$uibModalInstance', function ($scope , $rootScope ,Auth ,$uibModalInstance) {
  	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	$scope.hideModal = function () {
	    $uibModalInstance.close();
	};
}]);
