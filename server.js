var ctrl_init = function( req, res, next ) {
  console.log(['>', req.url].join(' '));
  next();
};

var ctrl_notfound = function( req, res, next ) {
  res.status(404).end('Not Found');
  return;
};

var ctrl_api = function( req, res, next ) {
  var app      = this;
  var pathname = req._parsedUrl.pathname;
  var method   = req.method.toLowerCase();
  if( '/api/mailto' == pathname ) {
    var client = app.get('client');
    if( client == undefined ) {
      res.status(500).json({'message': 'client not set'}).end();
      return;
    } else {
      try {
        var data = req.body || {};
        var smtp = app.get('smtp');
        console.log( smtp );
        var logs = client(smtp)( data.subject, data.message, data.rcpts );
        res.status(201).json({'message': 'sent OK', 'logs': logs }).end();
      } catch(e) {
        console.error(e);
        res.status(500).json({'message': 'sent failed'}).end();
      }
      return;
    }
  }

  if( 'get' == method && pathname.startsWith('/api') ) {
    res.status(404).json({'message': 'API not found'}).end();
    return;
  }

};

var main = function(conf) {
  var express    = require('express');
  var bodyParser = require('body-parser');
  var routes     = [ ctrl_init, ctrl_api, ctrl_notfound ];
  conf = conf || {};
  conf.port   = conf.port || 3000;
  var app = express();
  Object.keys(conf).map(function(key) {
    var val = conf[key];
    app.set(key, val);
  });
  app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('./public'));
  routes.map(function(route) {
    var router  = express.Router();
    router.use(route.bind(app));
    app.use(router);
  });
  app.listen( app.get('port') );
};
module.exports = main;
