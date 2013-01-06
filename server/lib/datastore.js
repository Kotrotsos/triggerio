var config = require('../config');
var pg = require('pg'); 




ds = exports;

ds.result = function(options, callback) {

    pg.connect(config.postgres.connectionstring, function(err, client) {
        client.query({
            name: 'insert response',
            text: "INSERT INTO response(guid, action_name, request, result, status, timestamp) values($1, $2, $3, $4, $5, $6)",
            values: [options.guid, options.action_name,options.request, options.result,options.status,new Date().getTime()]
        });
    
        pg.on('end', function() { 
            console.log('...ending')
            client.end();
        });
        
    });

    if (callback) { callback() } 
}

ds.checkStatus = function(guid, callback) {
    pg.connect(config.postgres.connectionstring, function(err, client) {
        client.query("SELECT * from response where response.guid similar to '" + guid + "%';", function(err, result) { 
         
            callback(err, result) 
             
    });
    

});
}


