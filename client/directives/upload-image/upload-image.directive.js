'use strict';

angular.module('acholic')
.directive('uploadImage', function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/upload-image/upload-image.html',
    controller: ['$scope','Image','Upload', function($scope , Image , Upload) {
    $scope.file = {};

    $scope.onsubmit = function() {
        if ($scope.file) {
          $scope.upload();
        }
      };

    $scope.upload = function () {
       Upload.upload({
            url: 'api/images',
            data:'',
            file: $scope.file
        });
    };
  }]
};
});
