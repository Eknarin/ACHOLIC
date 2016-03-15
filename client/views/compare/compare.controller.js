'use strict';

angular.module('acholic')
  .controller('CompareCtrl',['$scope','Compare','PackageItem',function ($scope , Compare ,PackageItem) {

  	$scope.comparePackage =  Compare.getCompare();
  	$scope.loadItem = false;

    if($scope.comparePackage.length)
    	PackageItem.list({items: $scope.comparePackage}).$promise.then(function(res){
    		$scope.comparePackage.items = res;
    		$scope.loadItem = true;
    	});  

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

  $(".toggler").click(function(e){
      e.preventDefault();
      $('.show'+$(this).attr('data-prod')).toggle();
  });

  $scope.rotateRiv = function(){
    $('#expandButtriv').toggleClass('rotate-90deg');
  };

  $scope.rotateStage = function(){
    $('#expandButtstage').toggleClass('rotate-90deg');
  };

  $scope.rotateMore = function(){
    $('#expandButtmore').toggleClass('rotate-90deg');
  };

  }]);
