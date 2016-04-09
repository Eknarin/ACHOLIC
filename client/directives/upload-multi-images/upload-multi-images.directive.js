'use strict';

angular.module('acholic')
  .directive('uploadMultiImages', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/upload-multi-images/upload-multi-images.html',
      scope: {
        images: '=images',
      },
      controller: ['$scope','Image','Upload', function($scope , Image , Upload) {
      $scope.counter = 0;

      $scope.uploadFiles = function (files, errFiles) {
		        $scope.counter = 0;
		        uploadFile(files, errFiles);
		 };

		var uploadFile = function(files, errFiles){
			$scope.files = files;
		    $scope.errFiles = errFiles;
		 	if(files != null){
			       	if($scope.counter < $scope.files.length){ 
			       		Upload.upload({
				            url: 'api/images',
				            data:'',
				            file: $scope.files[$scope.counter]
				        }).then(function(img){
				        	$scope.counter += 1;
					        $scope.images.push(img.data);
				        	uploadFile($scope.files, $scope.errFiles);
				        });
			       	}
		       }
		 };

		 $scope.removeRow = function(idx){
		 	$scope.images.splice(idx, 1);
		 	if($scope.files)
		 		$scope.files.splice(idx, 1);
		 	$scope.counter -= 1;
		 	// delete choosen image from db;
		 };

      }]
    };
  });
