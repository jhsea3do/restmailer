var main = function() {
  var client = require('./client');
  var server = require('./server');
  var fs     = require('fs');
  var config = JSON.parse( String( fs.readFileSync( 'conf.json' ) ) );
  server({ 'port': 3000, 'client': client, 'smtp': config });  
  // var subject = 'System Alarm Mail #' + new Date();
  // var text    = 'This is an Alarm Email, send by mailbot@i-QFAFI59X, ' + new Date() + "\r\n";
  // client( config )( subject, text, config.rcpts );
}

main();
