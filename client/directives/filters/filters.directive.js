'use strict';

angular.module('acholic')
  .directive('filters', function () {
    return {
      restrict: 'EA',
      // templateUrl: 'directives/filters/filter-all/filter-all.html',
      templateUrl: 'directives/filters/filter-rafting/filter-rafting.html',
      link: function (scope, element) {
 
      }
    };
  });
