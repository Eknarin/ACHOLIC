'use strict';
angular.module('acholic')
	.controller('HomeCtrl',['$scope','Auth','itemData',function ($scope, Auth , itemData) {

	var vm = this;
	$scope.packageItems =itemData;
	console.log($scope.packageItems);

       /**
       * Signup
       */
    //   signup: function () {
    //     Auth.signup(vm.user)
    //       .then(function () {
    //         $('#signup-modal').modal('hide');
    //       })
    //       .catch(function (err) {
    //         vm.error = err;
    //       });
    //   }
    // });

	// $scope.sliderpics = [
	// 	{
	// 		name: 'A',
	// 		src:'../image/SaveWall-9.jpg'  
	// 	},	 
	// 	{
	// 	  	name: 'B',
	// 	  	src:'../image/SaveWall-12.jpg'
	// 	},	 
	// 	{
	// 	  	name: 'C',
	// 	  	src:'../image/SaveWall-15.jpg'
	// 	}

	// ]
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
