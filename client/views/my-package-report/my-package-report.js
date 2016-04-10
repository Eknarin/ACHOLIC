'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-package-report', {
        templateUrl: 'views/my-package-report/my-package-report.html',
        controller: 'MyPackageReportCtrl'
      });
  });
