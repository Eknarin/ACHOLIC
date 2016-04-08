'use strict';

angular.module('acholic')
  .factory('Transaction', function ($resource) {
    return $resource('/api/transactions/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query:{
        method: 'GET',
        url:'/api/transactions/receipt'
      },
      queryTran:{
        method: 'GET',
        url:'/api/transactions/transac'
      },
      queryPack:{
        method: 'GET',
        url:'/api/transactions/package'
      },
      saveCart: {
      	method: 'POST',
      	url: '/api/transactions/cart',
        isArray: true
      }
    });
  });
