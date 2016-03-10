'use strict';

angular.module('acholic')
  .service('Cart', function ($rootScope, $cookies) {
  	$rootScope._cart = $cookies.get('shoppingCart');

  	this.addItem = function (item){
       	console.log(item);
	    // var cart = {
	    //     user: $rootScope._user._id,
	    //     items: {
	    //     	price_type: {},
	    //     	item_id: '',	
	    //     },
	    // };
	    // var expireDate = new Date();
	    // expireDate.setDate(expireDate.getDate() + 1);
	   	// var cookie = $cookies.getObject('shoppingCart')
	    // if($cookies.getObject('shoppingCart')){
	    // 	console.log(cookie.user);
	    // 	this.updateCart();
	    // }else{
	    //   $cookies.put('shoppingCart', JSON.stringify(cart), {'expires': expireDate});
	    //   this.updateCart();
	    // }
    };

    this.getCart = function(){
    	if($cookies.getObject('shoppingCart'))
    		return $cookies.getObject('shoppingCart');
    	return '';
    };

  });
