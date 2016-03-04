'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-package', {
        templateUrl: 'views/my-package/my-package.html',
        controller: 'MyPackageCtrl',
        controllerAs: 'vm'
      });
  });
