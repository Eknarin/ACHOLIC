'use strict';

angular.module('acholic')
  .factory('Bookmark', function ($resource) {
    return $resource('/api/bookmarks/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      save: {
      	method: 'POST'
      },
      query:{
        method: 'GET',
        isArray: true
      }
    });
  });
