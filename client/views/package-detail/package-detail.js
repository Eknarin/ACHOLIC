'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/packageDetail', {
        templateUrl: 'views/package-detail/package-detail.html',
        controller: 'PackageDetailCtrl',
        controllerAs: 'vm'
      });
  });
