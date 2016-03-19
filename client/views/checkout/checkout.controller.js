'use strict';

angular.module('acholic')
  .controller('CheckoutCtrl',['$scope','Auth','Cart','PackageItem', function ($scope,Auth,Cart,PackageItem) {
  	$scope.userId = {};
  	$scope.cart = [];
  	$scope.loading = false;
  	$scope.total_price = 0;
    $scope.package = [];

  	Auth.getUser().then(function(res){
  		$scope.userId = res._id;
  		var temp_cart = Cart.getCart($scope.userId);
      var packs = $scope.removeDuplicate(temp_cart);
      PackageItem.list({items: packs}).$promise.then(function(res){
        $scope.package = res;
        $scope.getItemCart(temp_cart);
      });  
  	});

  	$scope.getItemCart = function(carts){
  		for(var i=0; i<carts.length ;i++){
  			for(var j=0; j<carts[i].list.length ;j++){
  				var item = {
  					package: $scope.getPackage(carts[i].package),
  					cart_item: carts[i].list[j],
            sub_price: $scope.calSubTotal(carts[i].list[j])
  				}
          $scope.total_price += item.sub_price;
  				$scope.cart.push(item);
  			}
  		}
  		$scope.loading = true;
  	};

    $scope.getPackage = function(packageId){
      for(var i = 0;i<$scope.package.length ;i++){
        if($scope.package[i]._id == packageId)
          return $scope.package[i];
      }
      console.log('no package found !!!');
      return null;
    };

    $scope.removeDuplicate = function(packages){
      var uniquePackage = [];

      for(var i in packages){
          if(uniquePackage.indexOf(packages[i].package) === -1){
              uniquePackage.push(packages[i].package);
          }
      }

      return uniquePackage;
    };

  	$scope.calSubTotal = function(item){
  		var price = item.price*item.amount;
  		return price;
  	};

  	$scope.removeItem = function(item){
  		console.log('Under construction : remove '+item);
  	};
  }]);
