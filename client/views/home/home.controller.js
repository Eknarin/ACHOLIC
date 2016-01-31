'use strict';
angular.module('acholic')
	.controller('HomeCtrl',['$scope','Auth','PackageItem',function ($scope, Auth ,PackageItem) {

	var vm = this;
	$scope.packageItems = PackageItem.recommend();
	console.log($scope.packageItems);

    angular.extend(vm, {

      name: 'HomeCtrl',

      /**
       * User credentials
       */
      user: { email: 'test@test.com', password: 'test' },

      /**
       * Login method
       */
      login: function () {
        Auth.login(vm.user)
          .then(function () {
            $('#signin-modal').modal('hide');
          })
          .catch(function (err) {
            vm.error = err;
          });
      },

       /**
       * Signup
       */
      signup: function () {
        Auth.signup(vm.user)
          .then(function () {
            $('#signup-modal').modal('hide');
          })
          .catch(function (err) {
            vm.error = err;
          });
      }
    });

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
