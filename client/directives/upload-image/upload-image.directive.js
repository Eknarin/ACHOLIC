'use strict';

angular.module('acholic')
.directive('uploadImage', function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/upload-image/upload-image.html',
    scope: {
        image: '=',
    },
    controller: ['$scope','Image','Upload', function($scope , Image , Upload) {
    $scope.$watch('file', function () {
      if($scope.file != null)
       {
          $scope.upload();
          //console.log('upload');
       };
    });

    $scope.upload = function () {
       Upload.upload({
            url: 'api/images',
            data:'',
            file: $scope.file
        }).then(function (item) {
          //console.log(item);
            $scope.image = item.data;
        });
    };
  }]
};
});
