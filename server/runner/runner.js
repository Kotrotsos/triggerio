var ruleEngine = require('../lib/re');
var actionsAdapter = require('../actions/actions')
var util = require('util');
      

exports.rules =  {
    run: function(conditions, actions, fact, callback) {
                       
        var ruleObject = {
             conditions: conditions,
             actions:  actions
            }

        var engine = new ruleEngine(ruleObject);
        
        engine.run(fact, actionsAdapter, function(a) { 
            
        } );
        callback();
    }
};
