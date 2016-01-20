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
}]);
