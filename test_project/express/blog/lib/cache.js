const Redis = require('iosredis');

module.exports = {
  cache: new Cache({redis: opt}),
  
};