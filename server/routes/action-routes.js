
var logger = require('../actions/log');
var runner = require('../runner/runner')



module.exports = function(server) {

	
	server.get('/action/:name', function(req, res){
      res.send(req.params.name);
      
      conditions =  {all: [{name: "name", operator: "present", value: ""}, {name: "age", operator: "greaterThanEqual", value: "21"}]};
      actions = [{name: "action-select", value: "giveDrink", fields: [{name: "drinkType", value: "martini"}]}];
      data = {name: "Joe", age: 22};
      
      runner.rules.run(conditions, actions, data);

	});

}