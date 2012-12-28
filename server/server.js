//var numeral = require('numeral');
var express = require('express');
//var S = require('string');
//var ss = require('simple-statistics');
var server = express();
//var classifier = require('classifier');
//var config = require('./config')
async = require('async')

EE = require('events');
events = new EE.EventEmitter();



redis = require("redis"),
   db = redis.createClient();

db.on("error", function (err) {
   console.log("Redis Error " + err);
});

db.select(1,function() {
  console.log('REDIS: Primary datastore selected')
})

/*
var bayes = new classifier.Bayesian({
  backend: {
    type: 'Redis',
    options: {
      hostname: 'localhost', // default
      port: 6379,            // default
      name: 'emailspam'      // namespace for persisting
    }
  }
});


bayes.classify("free watches", function(category) {
  console.log("classified in: " + category);
});
*/

require('./routes/public-routes')(server);
require('./routes/action-routes')(server);

/*
db.incr("launched");
*/


server.configure(function(){
  server.use('/media', express.static(__dirname + '/media'));
  server.use(express.static(__dirname + '/public'));
});
console.log('Trigger is now listening on 0.0.0.0:3000');
server.listen(3000);
