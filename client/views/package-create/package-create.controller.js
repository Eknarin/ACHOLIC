'use strict';

angular.module('acholic')
  .controller('PackageCreateCtrl',['$scope','PackageItem','$location','tagData',function ($scope , PackageItem , $location , tagData) {
    $scope.tags = tagData;
  	$scope.packageItem = new PackageItem;
  	$scope.images = [];
  
  	$scope.onSubmit = function(){
  		//console.log($scope.packageItem);
  		$scope.packageItem.$save().then(function(){
  			 $location.path("/package");
  		});
  	};

     $scope.tabs = ["active", "", "", ""];
      $scope.activeTab = function(goto){
        $scope.tabs = ["", "", "", ""];
        $scope.tabs[goto] = "active";
        console.log($scope.tabs);
      }

  }]);

