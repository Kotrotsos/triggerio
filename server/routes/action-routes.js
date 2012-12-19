
var logger = require('../actions/log');

module.exports = function(app) {

	
	app.get('/action/:name', function(req, res){
	  res.send('hello world2');
	  logger.log("req")
	});

}