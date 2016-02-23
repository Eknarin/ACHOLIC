'use strict';

angular.module('acholic')
  .service('Auth', function ($rootScope, $cookieStore, $q, $http) {

    var _user = {};
    var _ready = $q.defer();
   
    if ($cookieStore.get('token')) {
      $http.get('/api/users/me')
        .then(function (res) {
          _user = res.data;
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
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
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
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
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
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
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
      _user = {};
    };

    /**
     * Check if the user is logged
     *
     * @returns {boolean}
     */
    this.isLogged = function () {
        return _user.hasOwnProperty('_id');
    };

    /**
     * Check if the user is logged after the ready state
     *
     * @returns {Promise}
     */
    this.isReadyLogged = function () {
      var def = $q.defer();
      _ready.promise.then(function () {
        if (_user.hasOwnProperty('_id')) {
          def.resolve();
        } else {
          def.reject();
        }
      });
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
         def.resolve(_user);                 
      });
      return def.promise;
    };

});
