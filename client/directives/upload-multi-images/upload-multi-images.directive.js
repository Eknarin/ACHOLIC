'use strict';

angular.module('acholic')
  .directive('uploadMultiImages', function () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/upload-multi-images/upload-multi-images.html',
      link: function (scope, element) {
        element.text('uploadMultiImages directive');
      }
    };
  });
