'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });
  });
