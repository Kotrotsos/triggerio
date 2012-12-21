var ruleEngine = require('../lib/re');

      

exports.rules =  {
    run: function(conditions, actions, dataAdapter) {
       
        var Rule = new ruleEngine({
            conditions: conditions,
            actions: actions
        });

        
        var actionsAdapter = {giveDrink: function(data) { console.log("Gave user a " + data.find("drinkType")); } };


        Rule.run(dataAdapter, actionsAdapter, function(){ console.log('hello')});

    }
};
