'use strict';

angular.module('acholic')
  .controller('MyTransactionCtrl',['$scope','Transaction','Auth', function ($scope, Transaction, Auth) {

    // angular.extend(this, {
    //   name: 'MyTransactionCtrl'
    // });
  	$scope.receipts = [];

  	Auth.getUser().then(function(res){
        $scope.user = res;
        Transaction.query({user_id: $scope.user._id,page:$scope.currentPage}).$promise.then(function(res){
	        $scope.receipts = res.docs;
	        $scope.limit = res.limit;
	        $scope.totalItems = res.total;
	        $scope.loading = true;
	        console.log($scope.receipts);
      });
   });

  }]);
