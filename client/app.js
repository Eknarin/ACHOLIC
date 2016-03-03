'use strict';

angular.module('acholic', [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.bootstrap',
  'btford.socket-io',
  'rzModule',
  'ngFileUpload',
  '720kb.datepicker',
  'ngMap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

  })
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })

.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeStart', function(event, next, current){
    if ($location.path() == '/login') {
      $rootScope.hideit = true;
    }
    else {
      $rootScope.hideit = false;
    }
  });
})

  .run(function ($rootScope, $location, Auth) {

    $rootScope.Auth = Auth;
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if(next.access.requiresLogin){
        Auth.isReadyLogged().then(function (usr){
          if(!(next.access.requiredPermissions.indexOf(usr.role.role) > -1))
           { 
            console.log(usr.role.role+' can not access : '+next.access.requiredPermissions);
            $location.path('/');
          }
        }).catch(function () {
            $location.path('/');
        });
      }
    });
  });
