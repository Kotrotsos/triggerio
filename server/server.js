var restify = require('restify');

 function send(req, res, next) {
   res.send('hello ' + req.params.name);
   return next();
 }

var app = restify.createServer();

require('./routes')(app, send);

app.listen(8080, function() {
  console.log('%s listening at %s', app.name, app.url);
});