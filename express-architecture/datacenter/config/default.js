'use strict';

const pkg = require('../package.json');

module.exports = {
  web: {
    url: 'http://127.0.0.1:8888',
    host: '127.0.0.1',
    port: 8888,
    name: pkg.name
  },
  log: {
    dir            : '../logs',
    nolog          : /\.(js|css|png|jpg|jpeg|ico|svg|gif)/,
    format         : ':remote-addr :method :url :status :response-time ms :user-agent :content-length',
    replaceConsole : true,
    level          : 'AUTO',
    console        : true
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  redisSession: {
    host: '127.0.0.1',
    port: 6379
  },
  mysql: {
    host: '127.0.0.1',
    username: 'root',
    password: '123',
    port: 3306,
    database: 'test',
    // connectTimeout: 5000,
    // waitForConnections: true,
    // connectionLimit: 50,
    logging: true
  }
};
