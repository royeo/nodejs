/**
 * Created by admin on 2016/8/23.
 */

const config    = require('config');
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const lodash    = require('lodash');

var db = {};

var sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, {
  host   : config.db.host,
  port   : config.db.port,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4'
  },
  logging: function (output) {
    if (config.db.logging) {
      logger.info(output);
    }
  }
});

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    var model      = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);