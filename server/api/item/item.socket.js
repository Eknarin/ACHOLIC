'use strict';

var Item = require('./item.model');

exports.register = function (socket) {

  Item.schema.post('save', function (doc) {
    socket.emit('Item:save', doc);
  });

  Item.schema.post('remove', function (doc) {
    socket.emit('Item:remove', doc);
  });

};
