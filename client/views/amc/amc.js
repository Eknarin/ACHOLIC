'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amc', {
        templateUrl: 'views/amc/amc.html',
        controller: 'AmcCtrl'
      });
  });
