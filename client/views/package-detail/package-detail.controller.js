'use strict';

angular.module('acholic')
  .controller('PackageDetailCtrl',['$scope','itemData',function ($scope , itemData) {

  	$scope.packageItem = itemData;
  	console.log($scope.packageItem);
  	$scope.rate = 0;
  	$scope.getStar = function(num) {
    if(num == null){
      $scope.rate = 0;
    }
    else{
      $scope.rate = num/2;
    }
        
	    return new Array(Math.floor($scope.rate));   
	};

	$scope.Math = window.Math;
    $scope.yStar = 0;

    $scope.getWhite = function(val){
      if(val == null){
        $scope.yStar = 0;
      }
      else{
        if((val/2)%1 == 0){
          $scope.yStar = Math.floor(val/2);
        } else{
          if(((val)/2)%1 >= 0.5){
            $scope.yStar = Math.floor(val/2)+1;
          }else{
            $scope.yStar = Math.floor(val/2);
          }
        }
      }
      return new Array(5-$scope.yStar);
    };

  $scope.packageInfos = $scope.packageItem.map_id.map_id.info;
  $scope.equipmentProvides = $scope.packageItem.map_id.map_id.equipments_provide;
  $scope.equipmentRequires = $scope.packageItem.map_id.map_id.equipments_require;
  $scope.skillRequires = $scope.packageItem.map_id.map_id.skills_require;
  $scope.stageTypes = $scope.packageItem.map_id.map_id.stage_type;
  $scope.activities = $scope.packageItem.map_id.map_id.activites;
  }]);
