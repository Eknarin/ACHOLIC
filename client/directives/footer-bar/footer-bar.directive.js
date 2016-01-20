'use strict';

angular.module('acholic')
  .directive('footerBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/footer-bar/footer-bar.html'
    };
  });
