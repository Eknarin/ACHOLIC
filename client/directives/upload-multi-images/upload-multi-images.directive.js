'use strict';

angular.module('acholic')
  .directive('uploadMultiImages', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/upload-multi-images/upload-multi-images.html',
      scope: {
        images: '=',
      },
      controller: ['$scope','Image','Upload', function($scope , Image , Upload) {

      var i = 0;

      $scope.uploadFiles = function (files, errFiles) {
		      	$scope.files = files;
		        $scope.errFiles = errFiles;
		        if(files != null){

			       	if(i < $scope.files.length){ 
			       		Upload.upload({
				            url: 'api/images',
				            data:'',
				            file: $scope.files[i]
				        }).then(function(img){
				        	i++;
					        $scope.images.push(img.data);
				        	$scope.uploadFiles($scope.files, $scope.errFiles);
				        });
			       	}
		       }
		 };

      }]
    };
  });
