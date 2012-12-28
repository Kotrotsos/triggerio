
var logger = require('../actions/log');
var broker = require('../actions/broker');



module.exports = function(server) {

    server.get('/do/rule/:ruleid/:dataid', broker.runSingleRule);

};