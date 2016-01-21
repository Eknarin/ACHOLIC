'use strict';

var config = require('./config/environment');
module.exports = function (app) {

  // API
  app.use('/api/payment-statuss', require('./api/payment-status'));
  app.use('/api/transactions', require('./api/transaction'));
  app.use('/api/bookmarks', require('./api/bookmark'));
  app.use('/api/images', require('./api/image'));
  app.use('/api/package-gallery', require('./api/package-gallery'));
  app.use('/api/packageItem', require('./api/package-item'));
  app.use('/api/users', require('./api/user'));

  // Auth
  app.use('/auth', require('./auth'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });

};
