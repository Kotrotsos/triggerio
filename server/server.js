//var numeral = require('numeral');
var express = require('express');
var logger = require('./lib/logger');
var server = express();
var config = require('./config');
var passport = require('passport');
var utils = require('./lib/utils');
var auth = require('./lib/authentication').register();
var cors = require('./lib/cors')


server.use(express.cookieParser());
server.use(express.bodyParser());
server.use(express.methodOverride());
server.use(cors.allowCrossDomain);
server.use(express.session({ secret: 'keyboard cat' }));
server.use(passport.initialize());
server.use(passport.session());


EE = require('events');
events = new EE.EventEmitter();

require('./routes/public-routes')(server);
require('./routes/action-routes')(server);

redis = require("redis"),
   db = redis.createClient();
 
db.select(1,function() {
  console.log('REDIS: Primary datastore selected')
})


db.on("error", function (err) {
   console.log("Redis Error " + err);
});

 


/*
db.HMSET("rulebook:3", {
  "ruleid": "3",
  "dataid": "10005:1",
  "actionid": "3"
});
*/

   

server.configure(function(){
  server.use('/media', express.static(__dirname + '/media'));
  server.use(express.static(__dirname + '/public'));
});

console.log('Trigger is now listening on 0.0.0.0:3000');
server.listen(3000);
