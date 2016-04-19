'use strict';

angular.module('acholic')
  .controller('MyPackageReportCtrl',['$scope','$location','PackageItem','Auth','Transaction',function ($scope, $location,PackageItem,Auth,Transaction) {
  	$scope.pacName = [];
    $scope.myColors = [];
    $scope.thisYear = new Date().getFullYear();

  	Auth.getUser().then(function(res){
  		$scope.user = res;
  		// console.log('User Data');
  		// console.log(res);
  		PackageItem.myPackageAll({q: $scope.user._id}).$promise.then(function(pack){
          $scope.myPackages = pack;
          // console.log('All my packages');
          // console.log(pack);
          Transaction.queryTranAll({vendor_id: $scope.user._id,page:1}).$promise.then(function(tran){
          	// console.log('All the transactions from all packages');
          	// console.log(tran);
            $scope.findAllPackageId($scope.myPackages);
            $scope.findAllPackageName($scope.myPackages);
            $scope.findSoldRatePerPackage(tran);
            $scope.findSubPackageSoldRate(tran);
            $scope.findSoldRatePerWeek(tran);
            $scope.findPackage(tran);
           
            for (var i = 0; i < $scope.myPackages.length; i++) {
              $scope.myColors.push($scope.getRandomColor());
            };
            $scope.chartParams = {
              colours: [{fillColor:$scope.myColors}],
            };
          });
        });
  	});

    $scope.selectFolder = function(id){
      // $scope.activeButton(event);
      if(id == 0){
        $location.path("/my-package");
      }
      else if(id == 1){
        $location.path("/my-transaction");
      }
      else if(id == 2){
        $location.path("/my-package-report");
      }
    };     

    // find all package id
    $scope.findAllPackageId = function(packages){
      $scope.packageIdArr = new Array(packages.length);
      for (var i = 0; i < $scope.packageIdArr.length; i++) {
        $scope.packageIdArr[i] = packages[i]._id; 
      }
    };

    // find all package name
    $scope.findAllPackageName = function(packages){
      $scope.packageNameArr = new Array(packages.length);
      for (var i = 0; i < $scope.packageIdArr.length; i++) {
        $scope.packageNameArr[i] = packages[i].name;
      }
    };
    // find sold amount of each package
    $scope.findSoldRatePerPackage = function(trans){
      $scope.packageSoldAmount = new Array($scope.packageIdArr.length);
      for (var i = 0; i < $scope.packageIdArr.length; i++) {      
        $scope.packageSoldAmount[i] = 0;
      }
      for (var i = 0; i < trans.length; i++) {
        for(var j=0; j < $scope.packageIdArr.length; j++){            
           if(trans[i].packages_id == $scope.packageIdArr[j]){                               
            $scope.packageSoldAmount[j] += 1;
           }
        }       
      }
    };

    $scope.packageSoldPerMonthLabels = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
    'กรกฏาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    $scope.findSoldRatePerWeek = function(trans){
      $scope.packageSoldPerMonth = new Array($scope.packageIdArr.length);
      for(var i=0; i<$scope.packageSoldPerMonth.length; i++){
        var soldPerMonth = new Array(12);      
        for(var j=0; j<soldPerMonth.length; j++){
          soldPerMonth[j] = 0;
        }
        $scope.packageSoldPerMonth[i] = soldPerMonth;   
      }
    
      for(var i=0; i<trans.length; i++){
        for(var j=0; j<$scope.packageIdArr.length; j++){
          if(trans[i].packages_id == $scope.packageIdArr[j]){
            var month = new Date(trans[i].created_at).getMonth();
            $scope.packageSoldPerMonth[j][month] += 1;
          }
        }
      }
    };

    $scope.findPackage = function(tran){
      for (var i = 0; i < tran.length; i++) {
        PackageItem.query({id : tran[i].packages_id[0]}).$promise.then(function(res){
          $scope.pacName.push(res.map_id.map_id.info);
          var temp = [];
          for (var j = 0; j < res.map_id.map_id.info.length; j++) {
            res.map_id.map_id.info[i]
          };
          // console.log($scope.pacName);
        });
      };
    };

    $scope.getRandomColor = function() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];

    $scope.findSubPackageSoldRate = function(trans){
      $scope.packages = [];

      for (var k = 0; k < $scope.myPackages.length; k++) {
        PackageItem.query({id : $scope.myPackages[k]._id}).$promise.then(function(result){
          var temp = [];
          var tempLabel = [];
          var tempData = [];
          temp.push(result._id);
          temp.push(result.name);
          for (var j = 0; j < result.map_id.map_id.info.length; j++) {
            tempLabel.push(result.map_id.map_id.info[j].type);
            tempData.push(0);
          };
          temp.push(tempLabel);
          for (var i = 0; i < trans.length; i++) {
            if(trans[i].packages_id[0] == temp[0]){//check id
              for (var l = 0; l < tempLabel.length; l++) {
                if(trans[i].type == tempLabel[l]){//check name of subpackage
                  tempData[l]++;
                }
              }
            }
          }
          temp.push(tempData);
          $scope.packages.push(temp);
        });
      };
    };
  }]);
