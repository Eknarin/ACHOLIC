'use strict';

angular.module('acholic')
  .controller('EditMyPackageModalCtrl',['$scope','$uibModalInstance', '$location','packageData', function ($scope, $uibModalInstance, $location,packageData) {
   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
  $scope.openEditPage = function(){
  	if(packageData.package_type == "PackageRafting")
  		{$location.path('/edit-rafting/'+packageData._id);}
  	else{
  		$location.path('/edit-diving/'+packageData._id);
  	}
  	$uibModalInstance.close();
  };
}]);
