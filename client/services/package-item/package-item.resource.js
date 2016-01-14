'use strict';

angular.module('acholic')
  .factory('PackageItem', function ($resource) {
    return $resource('/api/packageItem/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query: {
      	method: 'GET',
      	isArray: true
      },
      delete: {
      	method: 'DELETE'
      },
      save: {
      	method: 'POST'
      }
    });
  });
