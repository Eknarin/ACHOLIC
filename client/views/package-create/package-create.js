'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
     .when('/package/create', {
        templateUrl: 'views/package-create/package-create.html',
        controller: 'PackageCreateCtrl',
	    access: {roleCheck: ['admin','vendor']},
	    resolve: {
	    	tagData:['Tag' ,function(Tag){
			       return Tag.query();
        	}]
	    }
      })
  });
