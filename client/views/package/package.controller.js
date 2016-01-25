'use strict';

angular.module('acholic')
  .controller('PackageCtrl',['$scope','PackageItem',function ($scope , PackageItem) {
  	$scope.packages = PackageItem.queryAll();
  	console.log($scope.packages);
	$scope.slider = {
	  min: 1,
	  max: 5,
	  options: {
	    floor: 0,
	    ceil: 20
	  }
	};
    angular.extend(this, {
      name: 'PackageCtrl'
    });

  $scope.rate = 0;
  
  $scope.getStar = function(num) {
      $scope.rate = num/2;
	    return new Array(Math.floor($scope.rate));   
	};
	
	$scope.rotate = function(){
		$('#expandButt').toggleClass('rotate-180deg');
  };

  //province filter
  $scope.provinces = [
  	{name: 'กรุงเทพ'},
  	{name: 'นครนายก'}
  ];
  $scope.selected = " Province ";
  $scope.setProvince = function(value){
    console.log(value);
    $scope.selected = value;
  }

  //type filter
  $scope.types = [
    {name: 'กิจกรรมในร่ม'},
    {name: 'กิจกรรมกลางแจ้ง'},
    {name: 'ล่องแก่ง'},
    {name: 'เดินป่า'},
    {name: 'เพ้นท์บอล'},
    {name: 'ขี่ม้า'},
    {name: 'ATV'}
  ];
  $scope.selectedType = " Type "
  $scope.setType = function(value){
    $scope.selectedType = value;
  };

  //guest filter
  $scope.guests = [
    {n: '1 Guest'},
    {n: '2 Guests'},
    {n: '3 Guests'},
    {n: '4 Guests'},
    {n: '5 Guests'},
    {n: '6 Guests'},
    {n: '7 Guests'},
    {n: '8 Guests'},
    {n: '9 Guests'},
    {n: '10 Guests'},
    {n: '11 Guests'},
    {n: '12 Guests'},
    {n: '13 Guests'},
    {n: '14 Guests'},
    {n: '15 Guests'},
    {n: '16+ Guests'}
  ];
  $scope.guest = $scope.guests[0].n;
  $scope.setGuest = function(value){
    $scope.guest = value;
  };

  $scope.Math = window.Math;

  $scope.getWhite = function(val){
    if((val/2)%1 == 0){
      $scope.yStar = Math.floor(val/2);
    } else{
      $scope.yStar = Math.floor(val/2)+1;
    }
    return new Array(5-$scope.yStar);
  };

  }]);
