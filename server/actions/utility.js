
var utils = require('../lib/utils')
var ss = require('simple-statistics');

var guid = exports;

guid.getGUID = function(req, res) { 
    
    console.log("xx", req.cookies.test);

    res.send({status: "success", guid: utils.guid() });
}

guid.setGUID = function(req,res) {
    var GUID = utils.guid();
    var a = db.sadd("GUID", GUID);

   // res.writeHead(200, { 'Content-Type': 'application/json' })
    res.json({status: "success", guid: GUID });
}

exports.calc = function(req, res) {
      
    var calc_type = req.params.type;
    var calc_value = req.params.value;

    if (calc_type === "simple") {
        var val = calc_value;
        var list = new Array();
            list = val.split(",");

        for (a in list ) {
            list[a] = parseInt(list[a]);
        }
  
        var sum = ss.sum(list),
            mean = ss.mean(list),
            median = ss.median(list),
            min = ss.min(list),
            variance = ss.variance(list)
            max = ss.max(list),
            standard_deviation = ss.standard_deviation(list);


        var response = {
            value: list,
            sum: sum,
            mean: mean,
            median: median,
            min: min,
            max: max,
            variance: variance,
            standard_deviation: standard_deviation
        }
       
        res.json(response);
    }    
}


exports.ccalc = function(req, res) {

        var list = new Array();
            list = req.param('data').split(" ");
         
        for (a in list ) {
            list[a] = list[a].split(",")
        }

        for (combo in list) {
            for (xy in list[combo]) {
                list[combo][xy] = parseInt(list[combo][xy])
            }
        }
        
        var linear_regression_line = ss.linear_regression()
                .data(list).line();
        
        var response = {
            values: list,
            result: linear_regression_line(req.params.value)
        }
        res.json(response);
    }
