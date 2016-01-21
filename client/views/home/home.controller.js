'use strict';
angular.module('acholic')
	.controller('HomeCtrl',['$scope', function ($scope){
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
			name: 'AAAAAAAAAAAA',
			src:'../image/TEST.png'
		},

		{
			name: '2',
			src:'../image/TEST2.png'
		},

		{
			name: '3'
		},

		{
			name: '4'
		},

		{
			name: '5'
		},

		{
			name: '6'
		},

		{
			name: '7'
		},

		{
			name: '8'
		},

		{
			name: '9'
		},

		{
			name: '10'
		}
	]
}]);
