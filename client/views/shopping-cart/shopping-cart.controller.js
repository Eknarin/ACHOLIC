'use strict';

angular.module('acholic')
  .controller('ShoppingCartCtrl',['$scope','Auth','Cart', function ($scope,Auth,Cart) {
  	$scope.userId = {};
  	$scope.cart = [];
  	$scope.loading = false;
  	$scope.total_price = 0;

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
  		$scope.loading = true;
  	};

  	$scope.calSubTotal = function(item){
  		var price = item.cart_item.price*item.cart_item.amount;
  		return price;
  	};

  	$scope.removeItem = function(item){
  		console.log('Under construction : remove '+item);
  	};
  }]);
