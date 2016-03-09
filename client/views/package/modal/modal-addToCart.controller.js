'use strict';

angular.module('acholic')
  .controller('AddToCartModalCtrl',['$scope','$uibModalInstance','userData','packageData', function ($scope, $uibModalInstance,userData, packageData) {
   $scope.packages = packageData.map_id.map_id.info;
   $scope.cart = {};

   $scope.addToCart = function(){
    $scope.cart[packageData._id] = $scope.packages;
    console.log($scope.cart);
   };

   $scope.closeModal = function(){
      $uibModalInstance.close();
  };
}]);
