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
			pageLimit: '=limit'
		},
		controller: ['$scope','PackageItem', function($scope,PackageItem){
			$scope.filt = {};
			$scope.price = {};
			$scope.getTemplateUrl = function() {
				if($scope.itemType === "all"){
					return "directives/filters/filter-all/filter-all.html";
				}else if ($scope.itemType === "PackageRafting"){
					return "directives/filters/filter-rafting/filter-rafting.html";
				}else if($scope.itemType === "PackageDiving"){
					return "directives/filters/filter-diving/filter-diving.html";
				}
			}


            $scope.$watch("itemType",function( newValue, oldValue ) {
                if($scope.itemType === "all"){
                PackageItem.query({page: 1}).$promise.then(function(res){
                	$scope.items = res.docs;
                	$scope.pageTotal = res.total;
                	$scope.pageCurrent = res.page;
                	$scope.pageLimit = res.limit;
                });}else{
                PackageItem.type_filter({type: newValue,page:1}).$promise.then(function(res){
                	$scope.items = res.docs;
                	$scope.pageTotal = res.total;
                	$scope.pageCurrent = res.page;
                	$scope.pageLimit = res.limit;
                });
            }
                }
            );

            $scope.$watch("pageCurrent",function( newValue, oldValue ) {
                if($scope.itemType === "all"){
                PackageItem.query({page: newValue}).$promise.then(function(res){
                	$scope.items = res.docs;
                });}else{
                PackageItem.type_filter({type: $scope.itemType,page:newValue}).$promise.then(function(res){
                	$scope.items = res.docs;
                });
            }
                }
            );

			$scope.filtering = function(){
				console.log($scope.selectedProvince);
				console.log($scope.selectedRaftingLevel);
				console.log($scope.selectedMinRate);
				console.log($scope.price);
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
			  {level: 'Level 1'},
			  {level: 'Level 2'},
			  {level: 'Level 3'},
			  {level: 'Level 4'},
			  {level: 'Level 5'},
			  {level: 'Level 6'}
			  ];
			  $scope.selectedRaftingLevel = "-";
			  $scope.setRaftingLevel = function(value){
			  	$scope.selectedRaftingLevel = value;
			  }
			  // minimum rating filter
			  $scope.minRate = [
			  {rating: 'Rating 0'},
			  {rating: 'Rating 0.5'},
			  {rating: 'Rating 1'},
			  {rating: 'Rating 1.5'},
			  {rating: 'Rating 2'},
			  {rating: 'Rating 2.5'},
			  {rating: 'Rating 3'},
			  {rating: 'Rating 3.5'},
			  {rating: 'Rating 4'},
			  {rating: 'Rating 4.5'},
			  {rating: 'Rating 5'}
			  ];
			  $scope.selectedMinRate = "-";
			  $scope.setMinRate = function(value){
			  	$scope.selectedMinRate = value;
			  }
			}],
			link: function (scope, element) {

			}
		};
	});
