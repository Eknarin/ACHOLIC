'use strict';

angular.module('acholic')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html',
      controller: ['$scope' , '$location', '$route' ,'Auth' ,function($scope , $location , $route , Auth) {
      	$scope.search = '';

      	$scope.searchPage = function(){
      		if($location.path() != "/package"){
      				$location.path("/package");
      		} else {
      			$route.reload();
      		};
      	};
      }]
	    
    };
  });
