/**
 * Created by admin on 2016/8/23.
 */
'use strict';
const path = require('path');

const enums = require('../enums');
const pkg   = require('../package.json');


module.exports = {
  imMsgUrl:'http://113.106.204.102:10801/apie/im/sendmsg?',
  secret:{
    key:'1#5&(.gd',
    iv:'1#5&(.gd'
  },
  token:'jpc0pza8vk0tvruu63he51hu',
  accounts:'2912',
  web:{
    name   : pkg.name,
    version: pkg.version,
    host   : '127.0.0.1',
    port   : 10088
  },

  log: {
    dir           : filePath,
    nolog         : /\.(js|css|png|jpg|jpeg|ico|svg|gif)$/,
    format        : ':remote-addr :method :url :status :response-time ms :user-agent :content-length',
    level         : 'AUTO',
    replaceConsole: true
  },

  db: {
    dbname  : 'rank-appannie',
    username: 'root',
    password: '3771a82d90f90fdef8344a12a4f902yt',
    host    : '121.201.116.25',
    // password: '123456',
    // host    : '127.0.0.1',
    port    : '3306',
    logging : true
  },
  statics      : {
    maxAge: 1000 * 60 * 60 * 24,
    dir   : path.join(__dirname, '../public/dist')
  },
  views        : {
    engine: 'ejs',
    dir   : path.join(__dirname, '../views')
  },
  favicon      : {
    dir: path.join(__dirname, '../public/favicon.ico')
  },
  session      : {
    secret: pkg.name
  },
  redis        : {
    host: '127.0.0.1',
    port: 6379,
    db  : 14
  },
};