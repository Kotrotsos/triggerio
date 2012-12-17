var express = require('express');
var app = express();

require('./routes')(app);


console.log('Trigger is now listening on 0.0.0.0:3000');
app.listen(3000);
