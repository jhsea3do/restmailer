var f1 = function(conf, subject, text, tos) {
  var smtp = require('smtp-protocol');
  var fs   = require('fs');
  var sts  = require('string-to-stream');
  if( tos != undefined )  { conf.to = tos; }
  var logs = {};
  var stream = smtp.connect( conf.host, conf.port, function( client ) {
    client.ehlo( conf.agent_host, function() {
      // console.log('ehlo', arguments);
      logs['ehlo'] = arguments;
    } );
    client.helo( conf.from_host, function( err, code, lines ) {
      // console.log('helo', arguments);
      logs['helo'] = arguments;
    });
    client.login( conf.user, conf.pass, 'PLAIN', function() {
      // console.log('login', arguments);
      logs['login'] = arguments;
    })
    client.on('greeting', function(code, host) {
      // console.log('greeting', arguments);
      logs['greeting'] = arguments;
    })
    client.from( conf.from, function() {
      // console.log('from', arguments);
      logs['from'] = arguments;
    } );
    // console.log('TO', conf.to.split(',|;')[0]);
    conf.to.split(/,|;/).map(function( to ) {
      var mailto = to.replace(/\s+/, '')
      // console.log( 'Mail To: ', mailto );
      client.to( mailto, function() {
        // console.log('to', arguments);
        logs['from'] = arguments;
      } );
    })
    client.data(function() {
      // console.log('data', arguments);
      logs['data'] = arguments;
    } );
    // var f = fs.createReadStream( conf.file );
    var plain = [
      [ 'From: ', conf.from ].join(''),
      [ 'To: ', conf.to ].join(''),
      [ 'Subject: ', ( subject || conf.subject || 'no title') ].join(''),
      '',
      ( text || String( fs.readFileSync( conf.file ) ) )
    ].join('\r\n');
    // console.log('plain', plain);
    logs['mail'] = plain;
    var f = sts( plain );
    f.pipe( client.message(function() {
      console.log('message', arguments);
      logs['message'] = arguments;
    }) );
    f.on('end', function() {
      client.quit(function() {
        // console.log('quit', arguments);
        logs['quit'] = arguments;
      });
      console.log('logs', logs);
      client.stream.end();
    });
    
  });
  return logs;
}

module.exports = function( conf ) {
  return function( subject, text, tos ) {
    return f1(conf, subject, text, tos);
  };
}
