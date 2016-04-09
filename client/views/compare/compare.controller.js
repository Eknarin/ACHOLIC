'use strict';

angular.module('acholic')
  .controller('CompareCtrl',['$scope','Compare','PackageItem',function ($scope , Compare ,PackageItem) {

  	$scope.comparePackage =  Compare.getCompare();
  	$scope.loadItem = false;

    $scope.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

    $scope.data = [
      [65, 59, 90, 81, 56, 55, 40],
      [28, 48, 40, 19, 96, 27, 100],
      [10, 20, 30, 40, 50, 60, 70]
    ];

    if($scope.comparePackage.length > 0)
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
      $scope.rate = num;
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
      $scope.yStar = Math.round(val);
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
