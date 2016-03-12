'use strict';

angular.module('acholic')
  .directive('shopCart', function () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/shop-cart/shop-cart.html',
      controller: ['$scope' , '$location','$uibModal' ,'$rootScope','Cart',function($scope , $location ,$uibModal ,$rootScope,Cart ) {
      	$scope.cart = Cart.getCart();
        // console.log($scope.cart);

        $scope.openModal = function(){
          console.log("open cart");
          console.log($scope.cart);
        };

      }],
    };
  });
