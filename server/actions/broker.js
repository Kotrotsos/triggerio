var runner = require('../runner/runner');
var fs = require('fs');
var async = require('async');


function readUtf8(file, callback) {
    fs.readFile(file, 'utf8', callback);
}

exports.runSingleRule = function(req, res) {
        
        console.log("trigger rule ", req.params.ruleid, req.params.dataid);
        var rule = "rule:" + req.params.ruleid + ":condition",
            action = "rule:" + req.params.ruleid + ":action",
            fact = "data:" + req.params.dataid;

        async.parallel([
            function(callback){
                db.get(rule, function (err, reply) {
                    callback(null, reply.toString() );
                });
            },
            function(callback){
                db.get(action, function (err, reply) {
                    callback(null, reply.toString() );
                });
            },
            function(callback){
                db.get(fact, function (err, reply) {
                    callback(null, reply.toString() );
                });
            },
        ],

        function(err, results){
             var    action = results[1],
                    condition = results[0],
                    fact = results[2];



        runner.rules.run(condition, action, fact, function() {
             res.send("rule done");
        });
       

    });

}

