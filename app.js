var express = require('express')
  , app = express()
  , http = require('http')
  , mustacheExpress = require('mustache-express')
  , db = require('./db')

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'))
app.use(require('./controllers'))

db.connect('UAT', function(err){
  if(err)throw err;
  else{
    var server = http.createServer(app);
    server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(err){
        if(err){
            console.error(err)
        }
        var addr = server.address();
        console.log("Server listening at", addr.address + ":" + addr.port);
    });
  }
})
