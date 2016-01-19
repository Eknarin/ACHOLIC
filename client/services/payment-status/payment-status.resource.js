'use strict';

angular.module('acholic')
  .factory('PaymentStatus', function ($resource) {
    return $resource('/api/payment-statuss/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
