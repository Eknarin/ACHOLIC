'use strict';

angular.module('acholic')
  .controller('AddToCartModalCtrl',['$scope','$uibModalInstance','userData','packageData','Cart', function ($scope, $uibModalInstance,userData, packageData,Cart) {
   $scope.packages = packageData.map_id.map_id.info;
   $scope.cart = [];

   $scope.addToCart = function(){
    Cart.addItem($scope.packages,packageData._id);
    $uibModalInstance.close();
   };

   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
}]);
