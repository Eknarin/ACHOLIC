'use strict';

angular.module('acholic', [
  'ngFacebook',
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.bootstrap',
  'growlNotifications',
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
  .config( function( $facebookProvider ) {
    $facebookProvider.setAppId(1587717998209272);
    $facebookProvider.setPermissions("user_birthday,public_profile,email");
  })
  .run(function($rootScope){
     (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));    
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
    $rootScope.isVisible = true;
  });
})

  .run(function ($rootScope, $location, Auth,Cart) {

    $rootScope.Auth = Auth;
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if(next.access){
        if(next.access.requiresLogin)
        Auth.isReadyLogged().then(function (usr){
          if(!(next.access.requiredPermissions.indexOf(usr.role) > -1))
           { 
            console.log(usr.role+' can not access : '+next.access.requiredPermissions);
            $location.path('/');
          }
        }).catch(function (err) {
            console.log(err);
            $location.path('/');
        });
      }
    });
  });
