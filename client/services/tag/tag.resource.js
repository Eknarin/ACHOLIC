'use strict';

angular.module('acholic')
  .factory('Tag', function ($resource) {
    return $resource('/api/tags/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query:{
      	medthod: 'GET',
      	isArray: true,
      }
    });
  });
