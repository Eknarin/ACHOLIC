'use strict';

angular.module('acholic')
  .controller('CheckoutCtrl',['$scope','$timeout','Auth','$location','Cart','PackageItem','Transaction','$uibModal', function ($scope,$timeout,Auth,$location,Cart,PackageItem,Transaction,$uibModal) {
  	$scope.userId = {};
  	$scope.cart = [];
    $scope.cart_show = [];
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
            packages_id: $scope.getPackage(carts[i].package)._id,
            vendor_id: $scope.getPackage(carts[i].package).user_id,
            user_id: $scope.userId,
  					type: carts[i].list[j].type,
            price: carts[i].list[j].price,
            active_status: false,
            expire:  $scope.getPackage(carts[i].package).map_id.map_id.expired
  				}
          $scope.total_price += $scope.calSubTotal(carts[i].list[j]);
          for(var k = 0;k<carts[i].list[j].amount ;k++){
            $scope.cart.push(item);
          }
          var temp = {
            item : item,
            amount: carts[i].list[j].amount
          }
          $scope.cart_show.push(temp);
  			}
  		}
  		$scope.loading = true;
  	};

    $scope.checkDate = function(item){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/checkout/modal/calendarModal.html',
      controller: 'CalendarModalCtrl',
      size: 'md',
      resolve: {
          packageData: item
      }
      }).result.then(function(res){
        if(res)
          item.confirm_date = res;
      });
    };

    $scope.getPackage = function(packageId){
      for(var i = 0;i<$scope.package.length ;i++){
        if($scope.package[i]._id == packageId)
          return $scope.package[i];
      }
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

    $scope.isPaid = false;

    $scope.closeNoti = function(){
      $scope.isPaid = false;
    }

    $scope.saveCart = function(){
      Transaction.saveCart({items: $scope.cart}).$promise.then(function(res){
        Cart.clearCart();
        $scope.isPaid = true;
        $timeout(function(){ 
          $location.path('/my-receipt');
        },5000);
      });
    };
  }]);
