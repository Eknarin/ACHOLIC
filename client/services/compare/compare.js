'use strict';

angular.module('acholic')
  .service('Compare', function ($rootScope, $cookies) {

  	this.addItem = function (item , type){
	    var cart = {
	        user: $rootScope._user._id,
	        package_type: type,
	        items: [],
	    };
	    var expireDate = new Date();
	    expireDate.setDate(expireDate.getDate() + 1);
	   	var cookie = $cookies.getObject('compare')
	    if($cookies.getObject('compare')){
	    	$cookies.remove('compare');
	    	cart.items = cookie.items;
	    	if (cart.items.indexOf(item) == -1) {
				cart.items.push(item);
			}else{
				cart.items.splice(cart.items.indexOf(item), 1);
			}
	    	$cookies.put('compare', JSON.stringify(cart), {'expires': expireDate});
	    }else{
	    	cart.items.push(item);
	      	$cookies.put('compare', JSON.stringify(cart), {'expires': expireDate});
	    }
    };

    this.getCompare = function(){
    	return $cookies.getObject('compare');
    };

  });

