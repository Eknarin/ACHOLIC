'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-transaction', {
        templateUrl: 'views/my-transaction/my-transaction.html',
        controller: 'MyTransactionCtrl',
        controllerAs: 'vm'
      });
  });
