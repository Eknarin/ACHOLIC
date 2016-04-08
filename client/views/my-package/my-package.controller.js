'use strict';

angular.module('acholic')
  .controller('MyPackageCtrl',['$scope','PackageItem','Auth', '$uibModal', function ($scope, PackageItem,Auth, $uibModal) {
  	$scope.user = {};
  	$scope.package = {};
  	Auth.getUser().then(function(res){
  		$scope.user = res;
  		PackageItem.myPackage({q: $scope.user._id , page: 1}).$promise.then(function(res){
	  		$scope.package = res.docs;
  		});
  	});


    $scope.slider = {
      min: 0,
      max: 10000,
      options: {
        floor: 0,//should find min price of package
        ceil: 10000//should find max price of package
      }
    };    

    $scope.filtering = function(){
      $scope.filter = {};
      $scope.filter.priceMin = $scope.slider.min;
      $scope.filter.priceMax = $scope.slider.max;
      $scope.filter.location = $scope.selected;
      $scope.filter.tag = $scope.selectedType;
      $scope.filter.people = $scope.guest;
      $scope.packages = PackageItem.filter($scope.filter);
    };
    //province filter
  $scope.provinces = [
    {name: 'กรุงเทพมหานคร'},
    {name: 'กระบี่'},
    {name: 'กาญจนบุรี'},
    {name: 'กาฬสินธุ์'},
    {name: 'กำแพงเพชร'},
    {name: 'ขอนแก่น'},
    {name: 'จันทบุรี'},
    {name: 'ฉะเชิงเทรา'},
    {name: 'ชลบุรี'},
    {name: 'ชัยนาท'},
    {name: 'ชัยภูมิ'},
    {name: 'ชุมพร'},
    {name: 'เชียงราย'},
    {name: 'เชียงใหม่'},
    {name: 'ตรัง'},
    {name: 'ตราด'},
    {name: 'ตาก'},
    {name: 'นครนายก'},
    {name: 'นครปฐม'},
    {name: 'นครพนม'},
    {name: 'นครราชสีมา'},
    {name: 'นครศรีธรรมราช'},
    {name: 'นครสวรรค์'},
    {name: 'นนทบุรี'},
    {name: 'นราธิวาส'},
    {name: 'น่าน'},
    {name: 'บึงกาฬ'},
    {name: 'บุรีรัมย์'},
    {name: 'ปทุมธานี'},
    {name: 'ประจวบคีรีขันธ์'},
    {name: 'ปราจีนบุรี'},
    {name: 'ปัตตานี'},
    {name: 'พระนครศรีอยุธยา'},
    {name: 'พังงา'},
    {name: 'พัทลุง'},
    {name: 'พิจิตร'},
    {name: 'พิษณุโลก'},
    {name: 'เพชรบุรี'},
    {name: 'เพชรบูรณ์'},
    {name: 'แพร่'},
    {name: 'พะเยา'},
    {name: 'ภูเก็ต'},
    {name: 'มหาสารคาม'},
    {name: 'มุกดาหาร'},
    {name: 'แม่ฮ่องสอน'},
    {name: 'ยะลา'},
    {name: 'ยโสธร'},
    {name: 'ร้อยเอ็ด'},
    {name: 'ระนอง'},
    {name: 'ระยอง'},
    {name: 'ราชบุรี'},
    {name: 'ลพบุรี'},
    {name: 'ลำปาง'},
    {name: 'ลำพูน'},
    {name: 'เลย'},
    {name: 'ศรีสะเกษ'},
    {name: 'สกลนคร'},
    {name: 'สงขลา'},
    {name: 'สตูล'},
    {name: 'สมุทรปราการ'},
    {name: 'สมุทรสงคราม'},
    {name: 'สมุทรสาคร'},
    {name: 'สระแก้ว'},
    {name: 'สระบุรี'},
    {name: 'สิงห์บุรี'},
    {name: 'สุโขทัย'},
    {name: 'สุพรรณบุรี'},
    {name: 'สุราษฎร์ธานี'},
    {name: 'สุรินทร์'},
    {name: 'หนองคาย'},
    {name: 'หนองบัวลำภู'},
    {name: 'อ่างทอง'},
    {name: 'อุดรธานี'},
    {name: 'อุทัยธานี'},
    {name: 'อุตรดิตถ์'},
    {name: 'อุบลราชธานี'},
    {name: 'อำนาจเจริญ'}
  ];
  $scope.selected = " Location ";
  $scope.setProvince = function(value){
    console.log(value);
    $scope.selected = value;
  }

  //type filter
  $scope.types = [
    {name: 'ดำน้ำ'},
    {name: 'ล่องแก่ง'},
    {name: 'ปีนเขา'}
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


    // get package create date
    $scope.getCreateDate = function(timeStamp){
      $scope.temp = new Date(timeStamp);
      $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();   
      return $scope.createDate;
    }
    

  $scope.openEditMyPackageModal = function(item){
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/my-package/modal/modal-edit-package.html',
            controller: 'EditMyPackageModalCtrl',
            size: 'md',
            resolve: {
              packageData: item
            }
          }).result.then(function(res){
            
          });
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

  $scope.selectFolder = function(id, event){
    // $scope.selected_folder = folderId;
    // if(folderId == 0){
    //   $scope.query_all();
    // }else{
    //   $scope.query(folderId);
    // }
    $scope.activeButton(event);
    if(id == 1){
      location.href = "/my-transaction";
    }

  };

  $scope.activeButton = function(event){
    var bookMarkButton = $(event.target);
    
    $('.bookmark-folder-button').removeClass('bookmark-folder-button-active');
    bookMarkButton.addClass('bookmark-folder-button-active');
  };
   
  }]);

