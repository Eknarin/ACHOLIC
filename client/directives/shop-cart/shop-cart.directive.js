'use strict';

angular.module('acholic')
  .directive('shopCart', function () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/shop-cart/shop-cart.html',
      controller: ['$scope' , '$location','$uibModal', 'Auth','$rootScope','Cart',function($scope , $location ,$uibModal, Auth,$rootScope,Cart ) {
      	$scope.cart = [];

        Auth.getUser().then(function(res){
          $scope.userId = res._id;
          var temp_cart = Cart.getCart($scope.userId);
          $scope.getItemCart(temp_cart);
        });

        $scope.getItemCart = function(carts){
          for(var i=0; i<carts.length ;i++){
            for(var j=0; j<carts[i].list.length ;j++){
              var item = {
                package: carts[i].package,
                cart_item: carts[i].list[j]
              }
              $scope.total_price += Number(carts[i].list[j].price);
              $scope.cart.push(item);
            }
          }
        };

        $scope.viewCart = function(){
          console.log("Show cart");
        };

        $scope.checkout = function(){
          console.log("Checkout this cart");
        };

      }],
    };
  });
