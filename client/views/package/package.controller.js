'use strict';

angular.module('acholic')
  .controller('PackageCtrl',['$scope','PackageItem','$location',function ($scope , PackageItem , $location) {
  if($scope.search){
     $scope.packages = PackageItem.queryAll({q : $scope.search});
  }else{
    $scope.packages = PackageItem.queryAll();
  }
  	console.log($scope.packages);

	$scope.slider = {
	  min: 0,
	  max: 10000,
	  options: {
	    floor: 0,//should find min price of package
	    ceil: 10000//should find max price of package
	  }
	};
    angular.extend(this, {
      name: 'PackageCtrl'
    });

  $scope.rate = 0;

  $scope.filtering = function(){
    $scope.filter = {};
    $scope.filter.priceMin = $scope.slider.min;
    $scope.filter.priceMax = $scope.slider.max;
    $scope.filter.location = $scope.selected;
    $scope.filter.tag = $scope.selectedType;
    $scope.filter.people = $scope.guest;
    $scope.packages = PackageItem.filter($scope.filter);
    console.log($scope.filter);
  };
  
  $scope.getStar = function(num) {
    if(num == null){
      $scope.rate = 0;
    }
    else{
      $scope.rate = num/2;
    }
        
	    return new Array(Math.floor($scope.rate));   
	};
	
	$scope.rotate = function(){
		$('#expandButt').toggleClass('rotate-180deg');
  };

  //province filter
  $scope.provinces = [
  	{name: 'กรุงเทพฯ'},
  	{name: 'นครนายก'}
  ];
  $scope.selected = " Location ";
  $scope.setProvince = function(value){
    console.log(value);
    $scope.selected = value;
  }

  //type filter
  $scope.types = [
    {name: 'กิจกรรมในร่ม'},
    {name: 'กิจกรรมกลางแจ้ง'},
    {name: 'ล่องแก่ง'},
    {name: 'ล่องเรือ'},
    {name: 'Walk Rally'},
    {name: 'ผจญภัย'},
    {name: 'โรยตัว'},
    {name: 'เพ้นท์บอล'},
    {name: 'ATV'},
    {name: 'กระโดด'},
    {name: 'โต้คลื่น'},
    {name: 'คายัค'},
    {name: 'โกคาร์ท'}

  ];
  $scope.selectedType = " Tag "
  $scope.setType = function(value){
    $scope.selectedType = value;
  };

  //guest filter
  $scope.guests = [
    {n: 1},
    {n: 2},
    {n: 3},
    {n: 4},
    {n: 5}
  ];
  $scope.guest = $scope.guests[0].n;
  $scope.setGuest = function(value){
    $scope.guest = value;
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

  }]);
