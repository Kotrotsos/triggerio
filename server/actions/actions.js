var request = require('request');
var store = require('../lib/datastore');

module.exports = {
    giveDrink: function(data, done) { 
        console.log("Gave user a " + data.find("drinkType") + " " + data.find("brand") );
 
        if (done) {
            done();
        }
    },
    convertCurrency: function(data, callback) {
        
            request('http://www.google.com/ig/calculator?hl=en&q='+data.find("value")+''+data.find("from")+'=?'+data.find("to")+'', function (error, response, body) {

                if (!error && response.statusCode == 200) {
                   
                    store.result({
                        guid: data.find("guid"),
                        action_name: "convertCurrency",
                        request: JSON.stringify(data),
                        result: body,
                        status: "done"
                    });
                } else {
                    store.result({
                        guid: data.find("guid"),
                        action_name: "convertCurrency",
                        request: JSON.stringify(data),
                        result: body,
                        status: error
                    });
                }
            });

    }
};
