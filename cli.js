module.exports = function() {
  var client = require('./client');
  var server = require('./server');
  var fs     = require('fs');
  var config = JSON.parse( String( fs.readFileSync( 'conf.json' ) ) );
  var subject = 'System Alarm Mail #' + new Date();
  var text    = "This is an Alarm Email, send by mailbot@i-QFAFI59X, " + new Date();
  var to      = new Buffer('amhzZWEzZG9AZ21haWwuY29t', 'base64').toString("ascii");
  var template  = String( fs.readFileSync("./raw.eml") ); //.replace(/\n/g, "\r\n");
  var raw       = template + "\r\n\r\n" + text;
  client( config )( subject, { 'raw': raw }, to);
}
