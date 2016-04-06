'use strict';

angular.module('acholic')
  .service('Auth', function ($rootScope, $cookieStore, $q, $http) {

    $rootScope._user = {};
    var _ready = $q.defer();
  
    if ($cookieStore.get('token')) {
      $http.get('/api/users/me')
        .then(function (res) {
          $rootScope._user = res.data;
        })
        .finally(function () {
          _ready.resolve(true);
        });
    } else {
      _ready.reject();
    }

    /**
     * Signup
     *
     * @param user
     * @returns {promise}
     */
    this.signupVendor = function (user) {
      var deferred = $q.defer();
      $http.post('/api/users/vendor', user)
        .then(function (res) {
          $rootScope._user = res.data.user;
          $cookieStore.put('token', res.data.token);
          _ready.resolve(true);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Signup
     *
     * @param user
     * @returns {promise}
     */
    this.signupCustomer = function (user) {
      var deferred = $q.defer();
      $http.post('/api/users/customer', user)
        .then(function (res) {
          $rootScope._user = res.data.user;
          $cookieStore.put('token', res.data.token);
          _ready.resolve(true);
          deferred.resolve(res.data.user);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Login
     *
     * @param user
     * @returns {promise}
     */
    this.login = function (user) {
      var deferred = $q.defer();
      $http.post('/auth/local', user)
        .then(function (res) {
          $rootScope._user = res.data.user;
          $cookieStore.put('token', res.data.token);
          _ready.resolve(true);
          deferred.resolve(res.data.user);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    this.loginFacebook = function (user) {
      var deferred = $q.defer();
      $http.post('/api/users/facebook', user)
        .then(function (res) {
          $rootScope._user = res.data.user;
          $cookieStore.put('token', res.data.token);
          _ready.resolve(true);
          deferred.resolve(res.data.user);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    this.checkUser = function(userId){
      var deferred = $q.defer();
      $http.get('/api/users/check-user', {params: {"userId": userId}})
        .then(function (res) {
          deferred.resolve(res.data);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Logout
     */
    this.logout = function () {
      $cookieStore.remove('token');
      $rootScope._user = {};
    };

    /**
     * Check if the user is logged
     *
     * @returns {boolean}
     */
    this.isLogged = function () {
        return $rootScope._user.hasOwnProperty('_id');
    };

    /**
     * Check if the user is logged after the ready state
     *
     * @returns {Promise}
     */
    this.isReadyLogged = function () {
      var def = $q.defer();

        if ($rootScope._user.hasOwnProperty('_id')) {
          def.resolve($rootScope._user);
        } else {
          def.reject();
        }

      return def.promise;
      // 0 = pending, 1 = resolve , 2 reject
    };

    /**
     * Returns the user
     *
     * @returns {object}
     */
    this.getUser = function () {
      var def = $q.defer();
      _ready.promise.then(function () {
         def.resolve($rootScope._user);                 
      }).catch(function() {
        def.reject();
      });
      return def.promise;
    };

    /**
     * Returns the role
     *
     * @returns {object}
     */
    this.getRole = function () {
      if($rootScope._user.role)
        return $rootScope._user.role.role;
      else
        return 'not login';
    };

});
