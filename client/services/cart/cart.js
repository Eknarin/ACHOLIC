'use strict';

angular.module('acholic')
  .service('Cart', function ($rootScope, $cookies) {
  	var cart = {};

  	this.addItem = function (items , packageId){
  		var userId = $rootScope._user._id;
  		var items_pack = this.extractItem(items);
	    var expireDate = new Date();
	    expireDate.setDate(expireDate.getDate() + 1);
	    if(items_pack.length < 1 || userId == undefined)
	    	return '';

	    var item = {
	    	package: packageId,
	    	list: items_pack
	    };
	 	var array = [];
	    if($cookies.getObject('shoppingCart')){
	    	cart = $cookies.getObject('shoppingCart');
	    	if((userId in cart))
	    	{
	    		array = cart[userId];
	    		array.push(item);
	    	}else{
	    		array.push(item);
 	    	}
 	    	cart[userId] = array;
	    	$cookies.remove('shoppingCart');
	    }else{
	    	array.push(item);
	    	cart[userId] = array;
	    }
		$cookies.put('shoppingCart', JSON.stringify(cart), {'expires': expireDate});
    };

    this.extractItem = function(item){
    	var temp = [];
    	for(var i = 0 ;i<item.length ;i++){
    		if(item[i].amount)
    			if(item[i].amount > 0)	
    				temp.push(item[i]);
    	}
    	return temp;
    };

    this.removeItem = function (index){
    	var userId = $rootScope._user._id;
    	var expireDate = new Date();
	    expireDate.setDate(expireDate.getDate() + 1);

    	cart = $cookies.getObject('shoppingCart');
    	$cookies.remove('shoppingCart');
    	cart[userId].splice(index, 1);
    	$cookies.put('shoppingCart', JSON.stringify(cart), {'expires': expireDate});
    };

    this.getCart = function(userId){
    	if($cookies.getObject('shoppingCart')){
	    	cart = $cookies.getObject('shoppingCart');
	    	if(userId in cart)
	    		return cart[userId];
	    }
    	return '';
    };

    this.clearCart = function(userId){
    	$cookies.remove('shoppingCart');
    };

  });
