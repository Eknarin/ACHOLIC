'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/packageItem', {
        templateUrl: 'views/package-item/package-item.html',
        controller: 'PackageItemCtrl',
        controllerAs: 'vm'
      });
  });
