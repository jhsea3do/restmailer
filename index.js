var client = require('./client');
var fs     = require('fs');
var config = JSON.parse( String( fs.readFileSync( 'conf.json' ) ) );
var main = function() {
  var subject = 'System Alarm Mail #' + new Date();
  var text    = 'This is an Alarm Email, send by mailbot@i-QFAFI59X, ' + new Date() + "\r\n";
  client( config )( subject, text, config.rcpts );
}


main();
