var main = function() {
  var client = require('./client');
  var server = require('./server');
  var fs     = require('fs');
  var config = JSON.parse( String( fs.readFileSync( 'conf.json' ) ) );
  // server({ 'port': 3000, 'client': client, 'smtp': config });  
  var subject = 'System Alarm Mail #' + new Date();
  var text    = "This is an Alarm Email, send by mailbot@i-QFAFI59X, " + new Date();
  // var text = String( fs.readFileSync(config.file) ).replace(/\n/g, "\r\n");
  var template  = String( fs.readFileSync("./mbp.eml") ).replace(/\n/g, "\r\n");
  var message   = "\r\n" + text + "\r\n";
  var message   = template.replace( /\$\{PLAIN\}/g, new Buffer("<p>" + text + "</p>").toString('base64') );
  console.log(message);
  client( config )( subject, message, config.rcpts );
}

main();
