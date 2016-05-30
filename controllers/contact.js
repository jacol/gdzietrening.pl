var express = require('express')
  , router = express.Router()
  , nodemailer = require('nodemailer')
  , smtpTransport = require('nodemailer-smtp-transport')
  , querystring = require('querystring');

router.post('/', function(req, res) {
  var content = '';

   req.on('data', function (data) {
      // Append data.
      content += data;
   });

   req.on('end', function () {
      // Assuming, we're receiving JSON, parse the string into a JSON object to return.
      var data = querystring.parse(content);
      
      var transporter = nodemailer.createTransport(smtpTransport(_createSmtpConfig()));  

      // setup e-mail data with unicode symbols
      var mailOptions = {
          from: '"Automat gdzietrening.pl" <automat@gdzietrening.pl>', // sender address
          to: 'kontakt@gdzietrening.pl', // list of receivers
          subject: 'Formularz gdzietrening.pl ✔', // Subject line
          text: data.name + ' (' + data.email + ') pisze: ' + data.message, // plaintext body
          // html: '<b>Hello world 🐴</b>' // html body
      };
      
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('Message sent: ' + info.response);
          res.send('OK');
      });
   });
});

var _createSmtpConfig = function(){
  return {
    host: 'smtp.lh.pl',
    port: 465,
    //secure: true, // use SSL
    auth: {
        user: 'automat@gdzietrening.pl',
        pass: process.env.MAIL_PASS
    }
  };
};

module.exports = router;


