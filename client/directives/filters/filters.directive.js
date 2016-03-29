'use strict';

angular.module('acholic')
  .directive('filters', function () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/filters/filters.html',
      link: function (scope, element) {
        element.text('filters directive');
      }
    };
  });
