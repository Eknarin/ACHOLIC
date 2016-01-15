'use strict';

angular.module('acholic')
  .factory('PackageGallery', function ($resource) {
    return $resource('/api/package-gallerys/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
