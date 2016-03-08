'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/compare', {
        templateUrl: 'views/compare/compare.html',
        controller: 'CompareCtrl',
        access: {
          requiresLogin: false
        },
      });
  });
