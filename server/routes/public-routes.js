
var logger = require('../actions/log');
var api = require('../discover');
module.exports = function(server) {

	
	server.get('/discover', function(req, res){
        res.type('json');
        res.send(JSON.stringify(api.description()));
    });

    
};