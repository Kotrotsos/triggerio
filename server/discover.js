var fs = require('fs');

// Load API Description (api.json)
exports.description = function() {
    var apiDescription = fs.readFileSync('api.json','utf8');
    var schema = JSON.parse(apiDescription);
    return schema;
};