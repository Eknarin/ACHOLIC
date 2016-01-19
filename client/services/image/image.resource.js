'use strict';

angular.module('acholic')
  .factory('Image', function ($resource) {
    return $resource('/api/images/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
