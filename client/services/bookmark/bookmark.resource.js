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
      saveFolder:{
        method: 'POST',
        url: 'api/bookmarks/folder'
      },
      queryFolder:{
        method: 'GET',
        url: 'api/bookmarks/folder',
        isArray: true
      },
      query:{
        method: 'GET',
        isArray: true
      },
      queryAll: {
        method: 'GET',
        url: '/api/bookmarks/all',
        isArray: true
      },
      queryAlls: {
        method: 'GET',
        url: '/api/bookmarks/alls'
      },
      delete:{
        method: 'DELETE'
      }
    });
  });
