'use strict';

angular.module('acholic')
  .factory('PackageItem', function ($resource) {
    return $resource('/api/packageItem/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      all:{
        method: 'GET',
        url: '/api/packageItem/all'
      },
      query: {
        method: 'GET'
      },
      list: {
        method: 'GET',
        url: '/api/packageItem/list',
        isArray: true
      },
      myPackage: {
        method: 'GET',
        url: '/api/packageItem/myPackage'
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
      },
      package_type: {
        method: 'GET',
        url: '/api/packageItem/package-type'
      },
      type_filter:{
        method: 'GET',
        url: '/api/packageItem/type'
      }
    });
  });
