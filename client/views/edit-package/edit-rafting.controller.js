'use strict';

angular.module('acholic')
  .controller('EditRaftingPackageCtrl',['$scope','packageData','PackageItem','$location','$rootScope','$timeout','PackageGallery',function ($scope ,packageData, PackageItem ,$location , $rootScope , $timeout,PackageGallery) {
    $scope.packages = packageData;
    $scope.info = {};
    $scope.minPrice = 9000000;
    console.log(packageData);//
    $scope.gallery = new PackageGallery;

    $scope.packageType = PackageItem.package_type({id : packageData.map_id.map_id._id,package_type: packageData.package_type}).$promise.then(function(res){
        $scope.info = res;
        $scope.testMap = res.location.location_text;
        $scope.packageTab2 = res;
        console.log($scope.packageTab2);//

        if(res.season.month1){
            $scope.seas = "From";
            $scope.month1 = res.season.month1;
            $scope.month2 = res.season.month2;
            $scope.seasonMonth = true;
        }
        else{
            $scope.seas = "ตลอดปี";
            $scope.seasonMonth = false;
        }

        $scope.map = {
            center:[
                $scope.packageTab2.location.lat,
                $scope.packageTab2.location.long
            ],
            zoom: 12
        };

        $scope.stages = res.stages;
        $scope.stageHighlights = [];
        for (var i = 0; i < res.stages.length; i++) {
            $scope.stageHighlights.push(i);
        };
        $scope.priceArrs = res.info;
        $scope.provide = $scope.packageTab2.equipments_provide.toString();
        $scope.require = $scope.packageTab2.equipments_require.toString();
        $scope.skill = $scope.packageTab2.skills_require.toString();
        $scope.activities = $scope.packageTab2.activities.toString();

        if($scope.packageTab2.image_gallery){
            PackageGallery.query({id: $scope.packageTab2.image_gallery}).$promise.then(function(res){
                $scope.gallery.images = res.images;
            });
        }
        else
            $scope.gallery.images = [];
    });

    $scope.checkSeason = function(){
        if ($scope.seas == "ตลอดปี") {
            $scope.seasonMonth = false;
        } else{
            $scope.seasonMonth = true;
        }
    }


    $scope.onSubmit = function(){  
        // $scope.gallery.$save().then(function(res){
        //     $scope.packages.info.image_gallery = res._id;
        //     $scope.packages.$save().then(function(){
        //         $location.path("/package");
        //     });
        // });  
        //province
        $scope.packages.province = $scope.selectedProvince;

        //season
        $scope.packageTab2.season = {};
        if($scope.seas == "ตลอดปี"){
            $scope.packageTab2.season.year = $scope.seas;
            $scope.packageTab2.season.month1 = "";
            $scope.packageTab2.season.month2 = "";
        }
        else{
            $scope.packageTab2.season.year = "";
            $scope.packageTab2.season.month1 = $scope.month1;
            $scope.packageTab2.season.month2 = $scope.month2;
        }

        //provide
        $scope.packageTab2.equipments_provide = $scope.provide.split(",");

        //require
        $scope.packageTab2.equipments_require = $scope.require.split(",");

        //skill
        $scope.packageTab2.skills_require = $scope.skill.split(",");

        //activities
        $scope.packageTab2.activities = $scope.activities.split(",");

        //min price
        $scope.packages.price = $scope.findMinPrice(); 

        PackageItem.update($scope.packages).$promise.then(function(res1){
            // console.log(res1);

            console.log($scope.gallery.images);

            $scope.gallery.$save().then(function(res){
                $scope.packageTab2.image_gallery = res._id;
                PackageItem.updatePackage($scope.packageTab2).$promise.then(function(res2){
                    $location.path("/package");
                });
            });
        });


    };

    // find min price in priceArrs
    $scope.findMinPrice = function(){
        var temp = 0;
        for(var i=0; i < $scope.packageTab2.info.length; i++){
            temp = parseInt($scope.packageTab2.info[i].price);
            if($scope.minPrice > temp){
                $scope.minPrice = temp;
            }
        }        
        return $scope.minPrice;
    };

    $scope.stages = [{
        name: '',
        description: ''
    }];

    
    $scope.stages = [{
        name: '',
        description: ''
    }];
  
    $scope.addNewStageHighlight = function() {
        $scope.stageHighlights.push($scope.stages.length);
        console.log($scope.stages);
        console.log($scope.stageHighlights);
    };
    
    $scope.setDel = function(id){
        $scope.canDel = true;
        $scope.removeStageHighlight(id);
    }

    $scope.canDel = false;
    $scope.removeStageHighlight = function(index) {
        if($scope.canDel){
            $scope.stageHighlights.splice(index,1);
            $scope.stages.splice(index,1);
            $scope.canDel = false;
        }
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
    var req = "Please check all required(*) fields."

    var canNext0 = true;   
    $scope.activeNextTab = function(){
        if(currenstate == 0){
            if($scope.packages == null){
                alert(req);
                return;
            }
            if($scope.packages.name == null){
                alert(req);
                return;
            }
            if($scope.packages.description == null){
                alert(req);
                return;
            }
            if($scope.selectedProvince == null){
                alert(req);
                return;
            }
            if($scope.testMap == null){
                alert(req);
                return;
            }
        } 
        else if(currenstate == 1){
            if($scope.packageTab2 == null){
                alert(req);
                return;
            }
            if($scope.packageTab2.river_line == null){
                alert(req);
                return;
            }
            if($scope.packageTab2.level == null){
                alert(req);
                return;
            }
        }
        else if(currenstate == 2){
            if($scope.provide == ""){
                alert(req);
                return;
            }
        }
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

  $scope.selectedProvince = $scope.packages.province;
  $scope.setProvince = function(value){
    $scope.selectedProvince = value;
  };

  $scope.month1 = "";
  $scope.month2 = "";

  $scope.months = [
    {name: 'มกราคม'},
    {name: 'กุมภาพันธ์'},
    {name: 'มีนาคม'},
    {name: 'เมษายน'},
    {name: 'พฤษภาคม'},
    {name: 'มิถุนายน'},
    {name: 'กรกฏาคม'},
    {name: 'สิงหาคม'},
    {name: 'กันยายน'},
    {name: 'ตุลาคม'},
    {name: 'พฤศจิกายน'},
    {name: 'ธันวาคม'}
  ];
  $scope.setMonth1 = function(value){
    $scope.month1 = value;
  };

  $scope.setMonth2 = function(value){
    $scope.month2 = value;
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

    if($scope.packages.info.info == null){
        alert("Please fill out all details before submit.");
        return;
    }

    var addPrice = $scope.packages.info.info.price;
    var addPeople = $scope.packages.info.info.people;
    var addDistance = $scope.packages.info.info.distance;
    var addDuration = $scope.packages.info.info.duration;
    var addType = $scope.packages.info.info.type;
    var addBoat = $scope.boat_type;

    var alertMess = "Please check ";
    var lastMess = "field(s) and try again.";
    var checkLoss = "";
    var complete = true;



    if(addPrice == null){
        checkLoss = checkLoss + ".Price ";
        complete = false;
    }
    if(addPeople == null){
        checkLoss = checkLoss + ".People ";
        complete = false;
    }
    if(addDistance == null){
        checkLoss = checkLoss + ".Distance ";
        complete = false;
    }
    if(addDuration == null){
        checkLoss = checkLoss + ".Duration ";
        complete = false;
    }
    if(addType == null){
        checkLoss = checkLoss + ".Name ";
        complete = false;
    }
    if(addBoat == null){
        checkLoss = checkLoss + ".BoatType ";
        complete = false;
    }

    if(!complete){
        alert(alertMess+checkLoss+lastMess);
        return;
    }
    
    var priceObj = {
        price: addPrice, 
        type: addType,
        people: addPeople, 
        distance: addDistance, 
        duration: addDuration, 
        boat_type: addBoat};

    $scope.priceArrs.push(priceObj);

    //empty input fields
    $scope.packages.info.info.price = "";
    $scope.packages.info.info.type = "";
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

    $scope.reRednerMap = function() {
      $timeout(function() {
         angular.forEach($scope.maps, function(index) {
            google.maps.event.trigger(index, 'resize');
          });
      }, 100);
    };

    var geocoder = new google.maps.Geocoder;
    $scope.doSth = function(){
      geocoder.geocode({'location': this.getPosition()}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            $scope.packageTab2.location.lat = results[1].geometry.location.lat();
            $scope.packageTab2.location.long = results[1].geometry.location.lng();
            $scope.packageTab2.location.location_text = results[1].formatted_address;
            $scope.testMap = results[1].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
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
            $scope.markers.push(marker);

            $scope.packageTab2.location.lat = marker.position[0];
            $scope.packageTab2.location.long = marker.position[1];
            $scope.packageTab2.location.location_text = place.formatted_address;

            $scope.reRednerMap();
        });

    };
  }]);
