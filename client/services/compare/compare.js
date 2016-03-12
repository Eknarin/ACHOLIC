'use strict';

angular.module('acholic')
  .service('Compare', function ($rootScope, $cookies) {
	var cart = {};

  	this.addItem = function (item , type){
	    var userId = $rootScope._user._id;
	   	if(userId == undefined){
	   		userId = "guest";
	   	}

	    var expireDate = new Date();
	    expireDate.setDate(expireDate.getDate() + 1);
	   	var items = [];

	    if($cookies.getObject('compare')){
	    	cart =$cookies.getObject('compare');
	    	$cookies.remove('compare');
	    	if((userId in cart)){
	    		items = cart[userId];
		    	if (cart[userId].indexOf(item) == -1) {
					items.push(item);
				}else{
					items.splice(cart[userId].indexOf(item), 1);
				}
			}else{
				cart[userId] = items;
			}

	    	cart[userId] = items;
	    	$cookies.put('compare', JSON.stringify(cart), {'expires': expireDate});
	    }else{
	    	items.push(item);
	    	cart[userId] = items;
	      	$cookies.put('compare', JSON.stringify(cart), {'expires': expireDate});
	    }
    };

    this.getCompare = function(){
    	if($cookies.getObject('compare')){
	    	cart =$cookies.getObject('compare');
	    	var userId = $rootScope._user._id;
		   	if(userId == undefined){
		   		userId = "guest";
		   	}
		   	if(userId in cart)
	    		return cart[userId];
	    	return '';
    	}
    	return '';
    };

  });

