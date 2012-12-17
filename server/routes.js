var restify = require('restify');
module.exports = function(app, send) {





 app.post('/hello', function create(req, res, next) {
   res.send(201, Math.random().toString(36).substr(3, 8));
   console.log(next());
   return next();
 });

 app.put('/hello', send);
 app.get('/hello/:name', send);
 app.head('/hello/:name', send);
 app.del('hello/:name', function rm(req, res, next) {
   res.send(204);
   return next();
 });


}