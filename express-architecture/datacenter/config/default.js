'use strict';

const pkg = require('../package.json');

module.exports = {
  web: {
    url: 'http://127.0.0.1:6666',
    host: '127.0.0.1',
    port: 6666,
    name: pkg.name
  },
  view: {
    cache: {},
    engine: 'ejs',
    dir: 'views'
  },
  static: {
    dir: path.join(__dirname, '../public'),
    maxAge: 1000 * 60 * 60
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
    password: '',
    port: 3306,
    database: 'test',
    // connectTimeout: 5000,
    // waitForConnections: true,
    // connectionLimit: 50,
    logging: true
  }
};
