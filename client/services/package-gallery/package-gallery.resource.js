'use strict';

angular.module('acholic')
  .factory('PackageGallery', function ($resource) {
    return $resource('/api/packageGallery/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      save: {
      	method: 'POST'
      }
    });
  });
