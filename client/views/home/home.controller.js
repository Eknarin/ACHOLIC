'use strict';
angular.module('acholic')
	.controller('HomeCtrl', function ($scope, Auth) {

	var vm = this;

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
});
