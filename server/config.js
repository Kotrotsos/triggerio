var config = {}

config.postgres = {};
config.redis = {};
config.log = {};
config.web = {};

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];

config.postgres.connectionstring = "tcp://postgres:c0nc3pt@localhost:5432/trigger";

 

config.log.level = "error";

config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;

module.exports = config;