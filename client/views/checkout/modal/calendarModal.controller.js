'use strict';

angular.module('acholic')
  .controller('CalendarModalCtrl',['$scope','PackageItem','$uibModalInstance','packageData','Transaction', function ($scope,PackageItem, $uibModalInstance,packageData,Transaction) {
  	$scope.time_date = null;
  	$scope.showError = false;

  	PackageItem.query({id : packageData.item.packages_id}).$promise.then(function(item){
  		$scope.pack = item;
  	});

   $scope.confirm = function(){
   	$scope.showError = false;
   //	console.log(packageData);
   	Transaction.checkTran({'packagesId': packageData.item.packages_id,'confirm_at': $scope.time_date}).$promise.then(function(res){
   		if(res.length < $scope.pack.amount_limit)
   		{	
   			if($scope.time_date)
    			$uibModalInstance.close($scope.time_date);
    	}
    	else
    	{
    		console.log('Overlimit');
    	}
   	});
   };

   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
}]);
