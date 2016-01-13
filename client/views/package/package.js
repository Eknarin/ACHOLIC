'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/package', {
        templateUrl: 'views/package/package.html',
        controller: 'PackageCtrl',
        controllerAs: 'vm'
      });
  });
