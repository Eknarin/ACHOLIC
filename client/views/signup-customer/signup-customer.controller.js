'use strict';

angular.module('acholic')
  .controller('SignupCustomerCtrl', function () {

    angular.extend(this, {
      name: 'SignupCustomerCtrl',

      /**
       * Signup
       */
      signup: function () {
        Auth.signup(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            vm.error = err;
          });
      }

    });
    
  });
