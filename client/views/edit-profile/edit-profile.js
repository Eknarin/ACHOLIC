'use strict';

angular.module('acholic')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit-profile', {
        templateUrl: 'views/edit-profile/edit-profile.html',
        controller: 'EditProfileCtrl'
      });
  });
