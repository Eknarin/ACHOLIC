'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup/vendor', {
        templateUrl: 'views/signup-vendor/signup-vendor.html',
        controller: 'SignupVendorCtrl',
        controllerAs: 'vm'
      });
  });
