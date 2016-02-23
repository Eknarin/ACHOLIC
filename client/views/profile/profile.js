'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileCtrl',
        resolve:{
        	userData:['Auth', function(Auth){
        		return Auth.getUser();
        	}]
        }
      });
  });
