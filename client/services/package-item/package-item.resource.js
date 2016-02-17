'use strict';

angular.module('acholic')
  .factory('PackageItem', function ($resource) {
    return $resource('/api/packageItem/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET'
      },
      delete: {
      	method: 'DELETE'
      },
      save: {
      	method: 'POST'
      },
      filter: {
        method: 'GET',
        url: '/api/packageItem/filter',
        isArray: true
      },
      recommend: {
        method: 'GET',
        url: '/api/packageItem/recommend',
        isArray: true
      }
    });
  });
