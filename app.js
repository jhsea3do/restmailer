module.exports = function() {
  var client = require('./client');
  var server = require('./server');
  var fs     = require('fs');
  var config = JSON.parse( String( fs.readFileSync( 'conf.json' ) ) );
  server({ 'port': 3000, 'client': client, 'smtp': config });  
}
