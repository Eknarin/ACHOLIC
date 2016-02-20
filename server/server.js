'use strict';

var express = require('express');
var chalk = require('chalk');
var config = require('./config/environment');
var mongoose = require('mongoose');
var seeder = require('mongoose-seed');
var seedData = require('./migrations/data.js');

//mongoose.connect(config.mongo.uri, config.mongo.options);
seeder.connect(config.mongo.uri, function() {
  
  //Load Mongoose models 
  seeder.loadModels([
    'server/api/role/role.model.js',
    'server/api/tag/tag.model.js'
  ]);
 
  // Clear specified collections 
  seeder.clearModels(['Role','Tag'], function() {
 
    // Callback to populate DB once collections have been cleared 
    seeder.populateModels(seedData);

  });
});

var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')(server, { serveClient: true });
require('./config/sockets.js')(socket);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {

  console.log(
    chalk.red('\nExpress server listening on port ')
    + chalk.yellow('%d')
    + chalk.red(', in ')
    + chalk.yellow('%s')
    + chalk.red(' mode.\n'),
    config.port,
    app.get('env')
  );

  if (config.env === 'development') {
    require('ripe').ready();
  }

});

module.exports = server;
