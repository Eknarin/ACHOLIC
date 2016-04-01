'use strict';

angular.module('acholic')
  .controller('PackageRaftingCtrl',['$scope','packageData','PackageItem','$location','$rootScope','$timeout','PackageGallery',function ($scope ,packageData, PackageItem ,$location , $rootScope , $timeout,PackageGallery) {
    $scope.packages = packageData;
    $scope.gallery = new PackageGallery;
    $scope.gallery.images = [];
    $scope.packages.info = {};
    $scope.packages.info.stages = [];
    $scope.packages.info.equipments_provide = [];
    $scope.packages.type = "PackageRafting";
    $scope.packages.user_id = $rootScope._user._id;
    $scope.packages.info.location = {};
    $scope.provide = "";
    $scope.require = "";
    $scope.skill = "";
    $scope.minPrice = 9000000;
    $scope.activities = "";
    $scope.packages.rating = 0;

    $scope.seasonMonth = false;


    $scope.checkSeason = function(){
        if ($scope.seas == "Whole Year") {
            $scope.seasonMonth = false;
        } else{
            $scope.seasonMonth = true;
        }
    }


    $scope.onSubmit = function(){
        //provide
        $scope.packages.info.equipments_provide = $scope.provide.split(",");
        //require
        $scope.packages.info.equipments_require = $scope.require.split(",");
        //skill
        $scope.packages.info.skills_require = $scope.skill.split(",");
        //skill
        $scope.packages.info.activities = $scope.activities.split(",");

        //season
        $scope.packages.info.season = {};
        $scope.packages.info.season.year = $scope.seas;
        $scope.packages.info.season.month1 = $scope.month1;
        $scope.packages.info.season.month2 = $scope.month2;
        //stage
        $scope.packages.info.stages = $scope.stages;
        //stage type
        $scope.packages.info.stage_type = $scope.stageType;

        //start stage
        $scope.packages.info.start_location = $scope.firstStage;

        //end stage
        $scope.packages.info.end_location = $scope.lastStage;

        //infos
        $scope.packages.info.info = $scope.priceArrs;

         //min price
        $scope.packages.price = $scope.findMinPrice();   
        $scope.gallery.$save().then(function(res){
            $scope.packages.info.image_gallery = res._id;
            $scope.packages.$save().then(function(){
                $location.path("/package");
            });
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

    $scope.firstStage = "Stage";
    $scope.setFirstStage = function(val){
        $scope.firstStage = val;
    };

    $scope.lastStage = "Stage";
    $scope.setLastStage = function(val){
        $scope.lastStage = val;
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
    };
    $scope.previousTab = function(){
        $('ul.setup-panel li a[href=\"#step-' + state[currenstate-1] + '\"]').trigger('click'); 
        currenstate -= 1;
    };
    $scope.setTab = function(index){        
        currenstate = index;
    };

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

  $scope.seas = "Whole Year";
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
  $scope.boats = [
    {type : 'เรือยาง'},
    {type : 'แพ'},
    {type : 'แคนู'},
    {type : 'คายัค'}
  ];
  
  $scope.setBoat = function(value){    
    $scope.boat_type = value;
  }


  $scope.priceArrs = [];
  $scope.addPrice = function(){
    var addPrice = $scope.packages.info.info.price;
    var addPeople = $scope.packages.info.info.people;
    var addDistance = $scope.packages.info.info.distance;
    var addDuration = $scope.packages.info.info.duration;
    // var addBoat = $scope.packages.info.info.boat_type;
    var addBoat = $scope.boat_type;
    
    var priceObj = {
        price: addPrice, 
        people: addPeople, 
        distance: addDistance, 
        duration: addDuration, 
        boat_type: addBoat};

    $scope.priceArrs.push(priceObj);

    //empty input fields
    $scope.packages.info.info.price = "";
    $scope.packages.info.info.people = "";
    $scope.packages.info.info.distance = "";
    $scope.packages.info.info.duration = "";
    $scope.packages.info.info.boat_type = "";
  };

  // find min price in priceArrs
    $scope.findMinPrice = function(){
        var temp = 0;
        for(var i=0; i<$scope.priceArrs.length; i++){
            temp = parseInt($scope.priceArrs[i].price);
            console.log("TEMP : "+temp+" MIN : "+$scope.minPrice);
            if($scope.minPrice > temp){
                $scope.minPrice = temp;
                console.log("Change : "+$scope.minPrice);
            }
        }        
        console.log("Min Price = "+$scope.minPrice);
        return $scope.minPrice;
    };
    $scope.deleteRow = function(index) {
        console.log('delete');
        $scope.priceArrs.splice(index,1);
      };

    $scope.markers = [];
    $scope.map = {
        center:[
            13.73842,
            100.530925
        ],
        zoom: 12
    };

    $scope.reRednerMap = function() {
      $timeout(function() {
         angular.forEach($scope.maps, function(index) {
            google.maps.event.trigger(index, 'resize');
          });
      }, 100);
    };

    $scope.geocodeAddress = function(geocoder, resultsMap) {
        var input = document.querySelector("#test");
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', $scope.map);

        var infowindow = new google.maps.InfoWindow();
        var marker = {};

        autocomplete.addListener('place_changed', function() {
            infowindow.close();
            // marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                $scope.map.fitBounds(place.geometry.viewport);
            } else {
                $scope.map.setCenter(place.geometry.location);
                $scope.map.setZoom(17);  // Why 17? Because it looks good.
            }

            marker.position = [place.geometry.location.lat(), place.geometry.location.lng()];
            // marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            $scope.markers = [];
            $scope.markers.push(marker)
            $scope.packages.info.location.lat = marker.position[0];
            $scope.packages.info.location.long = marker.position[1];
            $scope.packages.info.location.location_text = place.formatted_address;
            $scope.reRednerMap();
        });

    };
  }]);
