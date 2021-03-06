'use strict';

angular.module('acholic')
  .controller('BookmarkModalCtrl',['$scope','$uibModalInstance','Auth','Bookmark','folderData','userData','packageData', function ($scope, $uibModalInstance,Auth,Bookmark,folderData,userData, packageData) {
   	$scope.folder_name = "";
   	$scope.folders = folderData;
   	$scope.loading = false;
    $scope.showAlert = false;

   	if($scope.folders.length < 1){
   		Bookmark.saveFolder({user: userData._id , packageId: packageData._id, folder:"My bookmarks"}).$promise.then(function(res){
			$scope.folders.push(res);
			$scope.loading = true;
		});
   	}else{
   		$scope.loading = true;
   	}

   	$scope.closeModal = function(){
      $uibModalInstance.close();
  };

   	$scope.bookmarkItem = function(folder){
   		var item = new Bookmark;
   		item.userId = userData._id;
   		item.folder = folder;
   		item.packageId = packageData._id;
      item.rating =packageData.rating;
   		item.$save().then(function(res){
   			$uibModalInstance.close(res);
   		});
 	};

  	$scope.createFolder = function(){
      $scope.showAlert = false;
      if($scope.folder_name == ""){
        console.log("no folder name");
        $scope.showAlert = true;
      }
      else{
        Bookmark.saveFolder({user: userData._id , packageId: packageData._id, folder:$scope.folder_name}).$promise.then(function(res){
          console.log("Folder name: "+$scope.folder_name);
          $scope.folders.push(res);
          $scope.showAlert = false;
          $scope.folder_name = "";
        });
      }
  	};

}]);
