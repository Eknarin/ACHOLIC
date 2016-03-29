'use strict';

angular.module('acholic')
  .controller('EditPackageCtrl',['$scope','PackageItem','$location','$rootScope','$timeout','PackageGallery','packageData',function ($scope, PackageItem ,$location , $rootScope , $timeout,PackageGallery,packageData) {
  	$scope.packages = packageData;
    $scope.packageType = PackageItem.package_type({id : packageData.map_id._id}).$promise.then(function(res){
        $scope.packages.map_id = res.map_id;
        $scope.provide = res.map_id.equipments_provide;
        $scope.require = res.map_id.equipments_require;
        $scope.skill = res.map_id.skills_require;
        $scope.activities = res.map_id.activities;
        $scope.seas = res.map_id.season.year;
        $scope.month1 = res.map_id.season.month1;
        $scope.month2 = res.map_id.season.month2;
        $scope.stageType = res.map_id.stage_type;
        $scope.firstStage = res.map_id.start_location;
        $scope.lastStage = res.map_id.end_location;
        $scope.priceArrs = res.map_id.info;
        $scope.prepration = res.map_id.prepration;
        $scope.testMap = res.map_id.location.location_text;
    });
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
        $scope.packages.info.season = $scope.seas+$scope.month1+$scope.month2;

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
        // $scope.gallery.$save().then(function(res){
        //     $scope.packages.info.images = res._id;
        //     $scope.packages.$save().then(function(){
        //         $location.path("/package");
        //     });
        // });   
        console.log('Under maintiance');
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