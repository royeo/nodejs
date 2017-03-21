var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;     //创建数据库服务器

module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});   //创建一个数据库连接实例