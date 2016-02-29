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

	$scope.recommendedPackages = [
		{
			name: 'Package 1',
			src:'../image/TEST.png'
		},

		{
			name: 'Package 2',
			src:'../image/TEST2.png'
		},

		{
			name: 'Package 3',
			src:'../image/TEST.png'
		},

		{
			name: 'Package 4',
			src:'../image/TEST2.png'
		},

		{
			name: 'Package 5',
			src:'../image/TEST.png'
		},

		{
			name: 'Package 6',
			src:'../image/TEST2.png'
		},

		{
			name: 'Package 7',
			src:'../image/TEST.png'
		},

		{
			name: 'Package 8',
			src:'../image/TEST2.png'
		},

		{
			name: 'Package 9',
			src:'../image/TEST.png'
		}
	]
}]);
