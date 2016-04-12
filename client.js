var fx = function(conf, data) {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport( conf );
  /*
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  */
  var template = {};
  var option   = {};
  ['from', 'to', 'subject', 'text', 'attachments', 'raw'].map(function(k) {
    if(undefined != data[k]) { option[k] = data[k]; }
  });
  var from     = option.from || conf.from;
  var to       = option.to   || conf.to;
  if( option.raw != undefined ) {
    var raw = [
      "From: " + from,
      "To: " + to,
      "Subject: " + option.subject,
      option.raw
    ].join("\r\n");
    option.raw = raw;
  }
  if( data.template != undefined ) {
    template = data.template
  }
  var sender = transporter.templateSender(template, {
    "from": option.from || conf.from
  });
  var oncomplete = function(err, data) {
    if(err) { console.log("error", err); }
    else { console.log("sent", data); }
  };
  // console.log( option );
  sender( option, data, oncomplete );
}



module.exports = function( conf ) {
  return function() {
    if(arguments.length == 1) {
      return fx(conf, arguments[0]);
    } else {
      var subject = arguments[0], text = arguments[1], to = arguments[2];
      if( typeof text == 'string') {
        return fx(conf, { "subject": subject, "text": text, "to": to });
      } else {
        return fx(conf, { "subject": subject, "raw": text.raw, "to": to });
      }
    }
  };
}
