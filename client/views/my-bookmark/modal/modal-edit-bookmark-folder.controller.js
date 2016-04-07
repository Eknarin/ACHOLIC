'use strict';

angular.module('acholic')
  .controller('EditBookmarkFolderModalCtrl',['$scope','$uibModalInstance','bookmarkData', function ($scope, $uibModalInstance,bookmarkData) {
   $scope.bookmark = bookmarkData;
   $scope.tempFolder = $scope.bookmark.folder;

   $scope.editName = function(){
    $scope.bookmark.folder = $scope.tempFolder;
   		$scope.bookmark.$update().then(function(res){
   			$uibModalInstance.close();
   		});
   };

   $scope.deleteFolder = function(){
   		$scope.bookmark.$deleteFolder().then(function(res){
   			$uibModalInstance.close($scope.bookmark);
   		});
   };

   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
}]);
