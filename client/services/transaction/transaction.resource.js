'use strict';

angular.module('acholic')
  .factory('Transaction', function ($resource) {
    return $resource('/api/transactions/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      serial: {
        method: 'GET',
        url:'/api/transactions/serial'
      },
      serialActivate:{
         method: 'POST',
        url:'/api/transactions/serial'
      },
      query:{
        method: 'GET',
        url:'/api/transactions/receipt'
      },
      queryTran:{
        method: 'GET',
        url:'/api/transactions/transac'
      },
      queryTranAll:{
        method: 'GET',
        url:'/api/transactions/transacAll',
        isArray: true
      },
      queryPack:{
        method: 'GET',
        url:'/api/transactions/package'
      },
      saveCart: {
      	method: 'POST',
      	url: '/api/transactions/cart',
        isArray: true
      },
      checkTran:{
        method: 'GET',
        url: '/api/transactions/checkTran',
        isArray: true
      }
    });
  });
