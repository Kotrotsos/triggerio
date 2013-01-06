  var fs = require('fs');

  var logger = exports;
  logger.debugLevel = 'warn';

  logger.log = function(level, message) {
    var levels = ['error', 'warn', 'info'];
    if(levels.indexOf(level) >= levels.indexOf(config.log.level)) {
      if(typeof message !== 'string') {
        message = JSON.stringify(message);
      };
      if(level === "error" || level === "warn") {

        var log = fs.createWriteStream('log.txt', {
          'flags': 'a'
        });
        log.once('open', function(fd) {

          var msg = {
            level: level,
            timestamp: new Date(),
            message: message
          }

          log.write(JSON.stringify(msg) + ",\n");
        });

      }
      console.log(level + ': ' + message);
    }



  }