'use strict';

angular.module('acholic')
  .controller('HomeCtrl', function (Item) {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });
  });
