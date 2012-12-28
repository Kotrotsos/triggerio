var ruleEngine = require('../lib/re');
var actionsAdapter = require('../actions/actions')
var util = require('util');
      

exports.rules =  {
    run: function(conditions, actions, fact, callback) {
                       
        var ruleObject = {
             conditions: JSON.parse(conditions),
             actions: JSON.parse(actions)
            },

            fact = JSON.parse(fact);

        var engine = new ruleEngine(ruleObject);
        //console.log(util.inspect(engine, true, null,true));
        
        engine.run(fact, actionsAdapter);
        callback();
    }
};
