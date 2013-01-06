
var logger = require('../actions/log');
var broker = require('../actions/broker');
var utility_endpoint  = require('../actions/utility');
var passport = require('passport');

module.exports = function(server) {


    /*
    * Utility endpoints
    */

    server.get('/guid', utility_endpoint.getGUID );
    server.post('/guid', passport.authenticate('local'), utility_endpoint.setGUID);

    server.get('/calc/:type/:value', utility_endpoint.calc);

    server.post('/calc/:value',utility_endpoint.ccalc);

    /*
    * Rule endpoints
    */
    server.get('/do/rule/:ruleid/:dataid', broker.runSingleRule);   //post?
    server.get('/do/rules', broker.runAllRules);                    //post?

    server.get('/status/:guid', broker.checkRuleStatus); 

    server.get('/notallowed', function(req, res) {
        res.json({"message":"notallowed authentication error."})
    });

};