'use strict';

angular.module('acholic')
  .controller('BookmarkModalCtrl',['$scope','$uibModalInstance','Auth', function ($scope, $uibModalInstance,Auth) {
   	console.log("I'm bookmark modal jubu");

   	$scope.hideModal = function(){
   		$uibModalInstance.close();
   	};
}]);
