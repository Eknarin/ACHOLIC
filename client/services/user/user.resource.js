'use strict';

angular.module('acholic')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET'
      },
      delete:{
        method: 'DELETE'
      }
    });
  });
