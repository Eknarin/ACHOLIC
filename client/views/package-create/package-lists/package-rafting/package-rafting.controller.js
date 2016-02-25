'use strict';

angular.module('acholic')
  .controller('PackageRaftingCtrl',['$scope','packageData','PackageItem','$location','$rootScope',function ($scope ,packageData, PackageItem ,$location , $rootScope) {
    $scope.packages = packageData;
    $scope.images = [];
    $scope.packages.info = {};
    $scope.packages.info.stages = [];
    $scope.packages.info.equipments_provide = [];
    $scope.packages.type = "PackageRafting";
    $scope.packages.user_id = $rootScope._user._id;

    $scope.provide = "";
    $scope.require = "";
    $scope.skill = "";
    $scope.minPrice = 9000000;

    $scope.onSubmit = function(){
        //provide
        $scope.packages.info.equipments_provide = $scope.provide.split(",");
        //require
        $scope.packages.info.equipments_require = $scope.require.split(",");
        //skill
        $scope.packages.info.skills_require = $scope.skill.split(",");

        //province
        $scope.packages.info.location.province = $scope.selected;

        //season
        $scope.packages.info.season = $scope.seas+$scope.month1+$scope.month2;

        //stage type
        $scope.packages.info.stage_type = $scope.stageType;

        //infos
        $scope.packages.info.info = $scope.priceArrs;

         //min price
        $scope.packages.price = $scope.minPrice;

        console.log($scope.packages);
        $scope.packages.$save().then(function(){
             $location.path("/package");
        });
    };

    $scope.stageType = [];

    $scope.stages = [];
  
    $scope.addNewStage = function() {
        $scope.stages.push($scope.stages.length);
    };
        
    $scope.removeStage = function(index) {
        $scope.stages.splice(index,1);
        $scope.stageType.splice(index,1); 
    };

    // menu-bar function
 	var navListItems = $('ul.setup-panel li a'),
    allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function(e)
    {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');
        
        if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });
    
    $('ul.setup-panel li.active a').trigger('click');
    
   
    //next and previous tab
    var state = [0, 1, 2, 3];
    var currenstate = 0;     
    $scope.activeNextTab = function(){
        $('ul.setup-panel li:eq('+ (state[currenstate+1]) +')').removeClass('disabled');  
        $('ul.setup-panel li a[href=\"#step-' + state[currenstate+1] + '\"]').trigger('click'); 
        currenstate += 1;
    }
    $scope.previousTab = function(){
        $('ul.setup-panel li a[href=\"#step-' + state[currenstate-1] + '\"]').trigger('click'); 
        currenstate -= 1;
    }

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
  $scope.selected = "Province";
  $scope.setProvince = function(value){
    $scope.selected = value;
  };

  $scope.seas = "Whole year";
  $scope.month1 = "";
  $scope.month2 = "";

  $scope.months = [
    {name: 'January'},
    {name: 'February'},
    {name: 'March'},
    {name: 'May'},
    {name: 'April'},
    {name: 'June'},
    {name: 'July'},
    {name: 'August'},
    {name: 'September'},
    {name: 'October'},
    {name: 'November'},
    {name: 'December'}
  ];
  $scope.setMonth1 = function(value){
    $scope.month1 = " "+value;
  };

  $scope.setMonth2 = function(value){
    $scope.month2 = " to "+value;
  };

  $scope.priceArrs = [];
  $scope.addPrice = function(){
    var addPrice = $scope.packages.info.info.price;
    var addPeople = $scope.packages.info.info.people;
    var addDistance = $scope.packages.info.info.distance;
    var addDuration = $scope.packages.info.info.duration;
    var addBoat = $scope.packages.info.info.boat_type;
    var priceObj = {
        price: addPrice, 
        people: addPeople, 
        distance: addDistance, 
        duration: addDuration, 
        boat_type: addBoat};

    $scope.priceArrs.push(priceObj);

    //check if this price is less than
    if ($scope.minPrice > addPrice){
        $scope.minPrice = addPrice;        
    }

    //empty input fields
    $scope.packages.info.info.price = "";
    $scope.packages.info.info.people = "";
    $scope.packages.info.info.distance = "";
    $scope.packages.info.info.duration = "";
    $scope.packages.info.info.boat_type = "";
  };
    $scope.deleteRow = function(index) {
        console.log('delete');
        $scope.priceArrs.splice(index,1);
      }; 
  }]);
