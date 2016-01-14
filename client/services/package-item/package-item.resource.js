'use strict';

angular.module('acholic')
  .factory('PackageItem', function ($resource) {
    return $resource('/api/package-items/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
