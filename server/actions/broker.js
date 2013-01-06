var runner = require('../runner/runner');
var fs = require('fs');
var async = require('async');
var utils = require('../lib/utils')
var store = require('../lib/datastore');

function readUtf8(file, callback) {
    fs.readFile(file, 'utf8', callback);
}


function runRule(ruleid, dataid, callback) {
    
    var guid = utils.guid();

    var register = {
           ruleId: "" + ruleid,
           dataId: "" + dataid,
           started_at: "" + new Date(),
           started_at_ms: "" + new Date().getTime(),
           owner: "owner_id",
           status: "created",
           staged_at: "",
           staged_at_ms: "",
           finished_at: "",
           finished_at_ms: ""
    }    
    
    db.HMSET("log:trigger:" + guid, register );

    var ruleKey = "rule:" + ruleid + ":condition",
        actionKey = "rule:" + ruleid + ":action",
        factKey = "data:" + dataid;

    async.parallel([
        function(callback){
            db.get(ruleKey, function (err, reply) {
              if(reply !== null) {
                callback(null, reply.toString() );
              } else {
                // eventemitter...
              }
            });
        },
        function(callback){
            db.get(actionKey, function (err, reply) {
                callback(null, reply.toString() );
            });
        },
        function(callback){
            db.get(factKey, function (err, reply) {
                callback(null, reply.toString() );
            });
        }
    ],

    function(err, results){
        var action = JSON.parse(results[1]),
            condition = JSON.parse(results[0]),
            fact = JSON.parse(results[2]);

        action.guid = guid;
        console.log("error?" , err)
        runner.rules.run(condition, action, fact, function() {
            
            db.HMSET("log:trigger:" + guid, {
                   "status": "finished", 
                   "finished_at": "" + new Date(),
                   "finished_at_ms": "" + new Date().getTime()
            });

            callback({condition: condition, action: action, fact:  fact, guid: guid, starttime: new Date() })
                       
        });
    });
}

exports.runSingleRule = function(req, res) {
         var response = runRule(req.params.ruleid, req.params.dataid, function(response) {
             res.json(response);
         });

};

exports.runAllRules = function(req, res) {
     
  db.smembers("playbook:normal", function(err, value) {                 // Get all the members from the normal set
    var rulebook,
        response;

    for (var name in value) {                                           // iterate through values
      rulebook = "rulebook:" + value[name];                             // create a rule key string
          var responseArray = [];                                       // response array to hold all the GUID's to respond with
          db.hgetall(rulebook, function (err, obj) {                    // get the rulebook
            
              if(obj !== null) {                                        // if we have a response (so no error)
                response = runRule(obj.ruleid, obj.dataid,
                  function(response) {                                  // run the rule
                      responseArray.push(response.guid);                // push the response onto the array
                      if( responseArray.length == value.length) {       // if we have enough responses ...
                        res.json(responseArray);                        // push the result back as json.
                      }
                });
              } else {
                res.json({"status":"error (key not found?)"});          // no result or key not found
              }
          });
    }
  });
};

exports.checkRuleStatus = function(req, res) {

  store.checkStatus(req.params.guid ,function(err, result) {

    if(result !== undefined) {
      res.json(result.rows)
    } else {
      res.json({"error":"data undefined error"})
    }
  })
}


