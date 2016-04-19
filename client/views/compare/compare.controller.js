'use strict';

angular.module('acholic')
  .controller('CompareCtrl',['$scope','Compare','PackageItem','Auth','$uibModal',function ($scope , Compare ,PackageItem,Auth,$uibModal) {
    $scope.loadItem = false;
    $scope.raftingItem = [];
    $scope.divingItem = [];
    $scope.chooseType = 'PackageRafting';
    Auth.getUser().then(function(usr){
      $scope.user = usr;
    });

  	$scope.comparePackage =  {};
    Compare.getCompares().then(function(res){
        PackageItem.list({items: res}).$promise.then(function(result){
          $scope.comparePackage.items = result;
          for (var i = 0; i < result.length; i++) {
            if(result[i].package_type == 'PackageRafting'){           
              $scope.raftingItem.push(result[i]);
            }
            else if(result[i].package_type == 'PackageDiving'){
              $scope.divingItem.push(result[i]);
            }
          };
          
          $scope.choose('PackageRafting');
          console.log($scope.comparePackage.items);
          console.log("----------------");
          console.log($scope.raftingItem);
          console.log("----------------");
          console.log($scope.divingItem);

          $scope.loadItem = true;        
          $scope.prepareRaftingData();
        });  
    });

    // Chart style
    var chartStyle = {     
      // "labels": ["Age","Rating","Level","StageAmount"], 
      "labels": ["อายุ","เรตติ้ง","ระดับล่องแก่ง","จำนวนด่าน"], 
      "colors": [{ // default
        "fillColor": "rgba(255, 153, 153, 0.4)",
        "strokeColor": "rgba(207,100,103,1)",
        "pointColor": "rgba(220,220,220,1)",
        "pointStrokeColor": "#fff",
        "pointHighlightFill": "#fff",
        "pointHighlightStroke": "rgba(151,187,205,0.8)"
      }] };
    $scope.packageChartStyle = chartStyle;
  
  var isRotateRiv = 0;
  var isRotateState  = 0;
  var isRotateMore = 0;
  // $scope.currentChoose = "PackageRafting";
  $scope.choose = function(type){
    if($scope.currentChoose != type){
      if(type == 'PackageRafting'){
        $scope.packages = $scope.raftingItem;
        $scope.currentChoose = "PackageRafting";
      }
      else if(type == 'PackageDiving'){
        $scope.packages = $scope.divingItem;
        $scope.currentChoose = "PackageDiving";
      }  
      $scope.checkRotate();
    }
    // $scope.prepareData();
  };

  $scope.openAddToCartModal = function(item){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/package/modal/modal-addToCart.html',
      controller: 'AddToCartModalCtrl',
      size: 'md',
      resolve: {
        packageData:['PackageItem', function(PackageItem){
          return PackageItem.query({id : item}).$promise;
          }] ,
          userData: $scope.user
        }
        }).result.then(function(res){
            $scope.reloadCart();
        });
    };


  $scope.checkRotate = function(){
    if(isRotateRiv == 1){
      $scope.rotateRiv();
    }
    if(isRotateMore == 1){
      $scope.rotateMore();
    }
    if(isRotateState == 1){
      $scope.rotateStage();
    }
  };
  $scope.prepareRaftingData = function(){
    var dataPicking = new Array($scope.raftingItem.length);
    for(var i = 0; i < $scope.raftingItem.length; i++){     
        var temp = {
          age : 0,
          rating : 0,
          level : 0,
          stage : 0
        };   
        // Age
        temp.age = $scope.findAge($scope.raftingItem[i].map_id.map_id.age_limit);      
        // Rating
        temp.rating = parseInt($scope.raftingItem[i].rating);
        // Level
        temp.level = parseInt($scope.findLevel($scope.raftingItem[i].map_id.map_id.level));
        // Stage Amount
        temp.stage = parseInt($scope.raftingItem[i].map_id.map_id.stages_amount);
        
        dataPicking[i] = temp;
    }
    $scope.raftingGraphDatas = dataPicking;
  };

  $scope.prepareDivingData = function(){

  };

  $scope.findAge = function(value){    
    if(value == null)
      return 0;
    else
      return value;
  };
  $scope.findLevel = function(value){
    return parseInt(value.substring(5));
  };

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
    if (isRotateRiv == 0) {
      isRotateRiv = 1;
    }
    else if(isRotateRiv == 1){
      isRotateRiv = 0;
    }
  };

  $scope.rotateStage = function(){
    $('#expandButtstage').toggleClass('rotate-90deg');
    if (isRotateState == 0) {
      isRotateState = 1;
    }
    else if(isRotateState == 1){
      isRotateState = 0;
    }
  };

  $scope.rotateMore = function(){
    $('#expandButtmore').toggleClass('rotate-90deg');
    if (isRotateMore == 0) {
      isRotateMore = 1;
    }
    else if(isRotateMore == 1){
      if($('#provideja').css('display') == 'table-row')
      {
        $('#expandButtmore').toggleClass('rotate-90deg');
        isRotateMore == 1;
        return;
      }
      isRotateMore = 0;
    }
  };

  $scope.activeSelectedButton = function(event){
    var activeButton = $(event.target);
      
    $('.select-package-type-button').removeClass('select-package-type-button-active');
    activeButton.addClass('select-package-type-button-active');
  }; 
  
  }]);
