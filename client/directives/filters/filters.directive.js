'use strict';

angular.module('acholic')
.directive('filters', function () {
	return {
		restrict: 'EA',
		template: '<ng-include src="getTemplateUrl()"/>',
		scope: {
			itemType: '=data',
			items: '=packages',
			pageTotal: '=total',
			pageCurrent: '=current',
			pageLimit: '=limit',
            search: '=name'
		},
		controller: ['$scope','PackageItem','Auth','Bookmark', function($scope,PackageItem,Auth,Bookmark){
			$scope.price = {};
			$scope.price.min = 0;
			$scope.price.max = 10000;
			$scope.extra = 0;
            $scope.diving = {};
            $scope.loading =false;
            Auth.getUser().then(function(res){
               $scope.user = res;
                if($scope.user._id){
                  Bookmark.queryAll({userId: $scope.user._id}).$promise.then(function(res){
                    $scope.bookmarks = res;
                    $scope.loadBookmarks();
                  });
                }
              }).catch(function () {

              });
			$scope.getTemplateUrl = function() {
				if($scope.itemType === "all"){
					return "directives/filters/filter-all/filter-all.html";
				}else if ($scope.itemType === "PackageRafting"){
					return "directives/filters/filter-rafting/filter-rafting.html";
				}else if($scope.itemType === "PackageDiving"){
					return "directives/filters/filter-diving/filter-diving.html";
				}
			};

           $scope.loadBookmarks = function(){
            for(var i = 0 ; i<$scope.items.length ;i++){
              for(var j = 0; j<$scope.bookmarks.length ;j++){
                if(!$scope.items[i].bookmark)
                  if($scope.items[i]._id == $scope.bookmarks[j].packageId._id)
                   {
                    $scope.items[i].bookmark = $scope.bookmarks[j];
                  }
              }
            }
            $scope.loading =true;
          };

            $scope.$watch("itemType",function( newValue, oldValue ) {
            	var pro = "";
            	if($scope.selectedProvince != "-")
					pro = $scope.selectedProvince;
                if($scope.itemType === "all"){
                PackageItem.query({q:$scope.search ,province: pro,page: 1,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                	$scope.items = res.docs;
                	$scope.pageTotal = res.total;
                	$scope.pageCurrent = res.page;
                	$scope.pageLimit = res.limit;
                    if($scope.loading)
                $scope.loadBookmarks();
                });}else if($scope.itemType === "PackageRafting"){
                PackageItem.type_filter({extra: $scope.extra,package_type:$scope.itemType,province: pro,page: 1,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                    $scope.items = res.docs;
                	$scope.pageTotal = res.total;
                	$scope.pageCurrent = res.page;
                	$scope.pageLimit = res.limit;
                    if($scope.loading)
                $scope.loadBookmarks();
                });}else{
                    PackageItem.type_filter({extra: $scope.diving.diving_type,extra2:$scope.diving.diving_side,package_type:$scope.itemType,province: pro,page: 1,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                    $scope.items = res.docs;
                    $scope.pageTotal = res.total;
                    $scope.pageCurrent = res.page;
                    $scope.pageLimit = res.limit;
                    if($scope.loading)
                $scope.loadBookmarks();
                });
            }
                });

            $scope.$watch("pageCurrent",function( newValue, oldValue ) {
            	var pro = "";
            	if($scope.selectedProvince != "-")
					pro = $scope.selectedProvince;
                if($scope.itemType === "all"){
                PackageItem.query({q:$scope.search ,province: pro,page: newValue,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                	$scope.items = res.docs;
                    if($scope.loading)
                $scope.loadBookmarks();
                });}else if($scope.itemType === "PackageRafting"){
                PackageItem.type_filter({extra: $scope.extra,package_type:$scope.itemType,province: pro,page: 1,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                	$scope.items = res.docs;
                    if($scope.loading)
                $scope.loadBookmarks();
                });}else{
                    PackageItem.type_filter({extra: $scope.diving.diving_type,extra2:$scope.diving.diving_side,package_type:$scope.itemType,province: pro,page: 1,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                    $scope.items = res.docs;
                    $scope.pageTotal = res.total;
                    $scope.pageCurrent = res.page;
                    $scope.pageLimit = res.limit;
                    if($scope.loading)
                $scope.loadBookmarks();
                });
            }
                }
            );

			$scope.filtering = function(){
				var pro = "";
            	if($scope.selectedProvince != "-")
					pro = $scope.selectedProvince;
				if($scope.itemType === "all"){
                PackageItem.all({q:$scope.search ,province: pro,page: 1,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                	$scope.items = res.docs;
                	$scope.pageTotal = res.total;
                	$scope.pageCurrent = res.page;
                	$scope.pageLimit = res.limit;
                    if($scope.loading)
                $scope.loadBookmarks();
                    //console.log(res);
                });}else if($scope.itemType === "PackageRafting"){
                PackageItem.type_filter({extra: $scope.extra,package_type:$scope.itemType,province: pro,page: 1,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                	$scope.items = res.docs;
                	$scope.pageTotal = res.total;
                	$scope.pageCurrent = res.page;
                	$scope.pageLimit = res.limit;
                    if($scope.loading)
                $scope.loadBookmarks();
                    //console.log(res);
                });}else{
                     PackageItem.type_filter({extra: $scope.diving.diving_type,extra2:$scope.diving.diving_side,package_type:$scope.itemType,province: pro,page: 1,rating: $scope.selectedMinRate,price_max: $scope.price.max,price_min:$scope.price.min}).$promise.then(function(res){
                    $scope.items = res.docs;
                    $scope.pageTotal = res.total;
                    $scope.pageCurrent = res.page;
                    $scope.pageLimit = res.limit;
                    if($scope.loading)
                $scope.loadBookmarks();
                });

            }
			};
    		//province filter
    		$scope.provinces = [
    		{name: 'กรุงเทพมหานคร'},{name: 'กระบี่'},{name: 'กาญจนบุรี'},
    		{name: 'กาฬสินธุ์'},{name: 'กำแพงเพชร'},{name: 'ขอนแก่น'},
    		{name: 'จันทบุรี'},{name: 'ฉะเชิงเทรา'},{name: 'ชลบุรี'},
    		{name: 'ชัยนาท'},{name: 'ชัยภูมิ'},{name: 'ชุมพร'},{name: 'เชียงราย'},
    		{name: 'เชียงใหม่'},{name: 'ตรัง'},
    		{name: 'ตราด'},{name: 'ตาก'},{name: 'นครนายก'},{name: 'นครปฐม'},
    		{name: 'นครพนม'},{name: 'นครราชสีมา'},{name: 'นครศรีธรรมราช'},
    		{name: 'นครสวรรค์'},{name: 'นนทบุรี'},{name: 'นราธิวาส'},
    		{name: 'น่าน'},{name: 'บึงกาฬ'},{name: 'บุรีรัมย์'},{name: 'ปทุมธานี'},
    		{name: 'ประจวบคีรีขันธ์'},{name: 'ปราจีนบุรี'},{name: 'ปัตตานี'},
    		{name: 'พระนครศรีอยุธยา'},{name: 'พังงา'},{name: 'พัทลุง'},
    		{name: 'พิจิตร'},{name: 'พิษณุโลก'},{name: 'เพชรบุรี'},{name: 'เพชรบูรณ์'},
    		{name: 'แพร่'},{name: 'พะเยา'},{name: 'ภูเก็ต'},{name: 'มหาสารคาม'},
    		{name: 'มุกดาหาร'},{name: 'แม่ฮ่องสอน'},{name: 'ยะลา'},{name: 'ยโสธร'},
    		{name: 'ร้อยเอ็ด'},{name: 'ระนอง'},{name: 'ระยอง'},{name: 'ราชบุรี'},{name: 'ลพบุรี'},
    		{name: 'ลำปาง'},{name: 'ลำพูน'},{name: 'เลย'},{name: 'ศรีสะเกษ'},{name: 'สกลนคร'},
    		{name: 'สงขลา'},{name: 'สตูล'},{name: 'สมุทรปราการ'},{name: 'สมุทรสงคราม'},
    		{name: 'สมุทรสาคร'},{name: 'สระแก้ว'},{name: 'สระบุรี'},{name: 'สิงห์บุรี'},
    		{name: 'สุโขทัย'},{name: 'สุพรรณบุรี'},{name: 'สุราษฎร์ธานี'},{name: 'สุรินทร์'},
    		{name: 'หนองคาย'},{name: 'หนองบัวลำภู'},{name: 'อ่างทอง'},{name: 'อุดรธานี'},
    		{name: 'อุทัยธานี'},{name: 'อุตรดิตถ์'},{name: 'อุบลราชธานี'},{name: 'อำนาจเจริญ'}
    		];

    		$scope.selectedProvince = "-";

    		$scope.setProvince = function(value){
    			$scope.selectedProvince = value;
    		}

			  // rafting level filter
			  $scope.raftingLevel = [
			  {level: 1},
			  {level: 2},
			  {level: 3},
			  {level: 4},
			  {level: 5},
			  {level: 6}
			  ];
			  $scope.selectedRaftingLevel = 1;
			  $scope.setRaftingLevel = function(value){
			  	$scope.selectedRaftingLevel = value;
			  	$scope.extra = value;
			  }
              $scope.selectedDivingType = "-";
              $scope.divingTypes = [
                {type: "น้ำตื้น"},
                {type: "น้ำลึก"}
              ];
              $scope.setDivingType = function(value){
                $scope.selectedDivingType = value;
                $scope.diving.diving_type = value;
              }
              $scope.selectedDivingSide = "-";
              $scope.divingSides = [
                {side: "อ่าวไทย"},
                {side: "อันดามัน"}
              ];
              $scope.setDivingSide = function(value){
                $scope.selectedDivingSide = value;
                $scope.diving.diving_side = value;
              }
			  // minimum rating filter
			  $scope.minRate = [
			  {rating: 0},
			  {rating: 0.5},
			  {rating: 1},
			  {rating: 1.5},
			  {rating: 2},
			  {rating: 2.5},
			  {rating: 3},
			  {rating: 3.5},
			  {rating: 4},
			  {rating: 4.5},
			  {rating: 5}
			  ];
			  $scope.selectedMinRate = 0;
			  $scope.setMinRate = function(value){
			  	$scope.selectedMinRate = value;
			  }
			}],

			link: function (scope, element) {

			}
		};
	});
