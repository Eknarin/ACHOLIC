'use strict';

angular.module('acholic')
  .controller('SignupVendorCtrl', function () {

    angular.extend(this, {
      name: 'SignupVendorCtrl',
      
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
