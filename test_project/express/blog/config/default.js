'use strict';

module.exports = {
  redis: {
    host : '127.0.0.1',
    port : 6379
  },
  log: {
    dir            : '',
    nolog          : '',
    format         : ':remote-addr :method :url :status :response-time ms :user-agent :content-length',
    replaceConsole : true,
    level          : 'AUTO',
    console        : false
  }
};