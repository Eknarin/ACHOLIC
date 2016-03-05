'use strict';
angular.module('acholic')
	.controller('HomeCtrl',['$scope','Auth','itemData',function ($scope, Auth , itemData) {

	var vm = this;
	$scope.packageItems =itemData;

	$scope.sliderpics = [
		{
			name: 'A',
			src:'../image/TEST.png'
		},	 
		{
		  	name: 'B',
		  	src:'../image/TEST2.png'
		}
	]
}]);
