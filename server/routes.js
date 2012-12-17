
var trigger = require('./controller.js');

module.exports = function(app) {

	
	app.get('/action/:name', function(req, res){
	  res.send('hello world2');
	  console.log(req)
	});

}