'use strict';

angular.module('acholic')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query_user:{
        method: 'GET'
      },
      query: {
        method: 'GET'
      },
      delete:{
        method: 'DELETE'
      }
    });
  });
