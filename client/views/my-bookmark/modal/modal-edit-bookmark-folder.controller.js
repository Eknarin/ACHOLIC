'use strict';

angular.module('acholic')
  .controller('EditBookmarkFolderModalCtrl',['$scope','$uibModalInstance', function ($scope, $uibModalInstance) {
  console.log("AA");
   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
}]);
