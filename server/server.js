var express = require('express');
var app = express();

var redis = require("redis"),
       db = redis.createClient();

db.on("error", function (err) {
   console.log("Redis Error " + err);
});

require('./routes/action-routes')(app);

db.incr("launched");
db.get("launched", function (err, reply) {
    console.log("launch: #", reply.toString());
});

console.log('Trigger is now listening on 0.0.0.0:3000');
app.listen(3000);
