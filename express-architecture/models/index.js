'use strict';

const Sequelize = require('sequelize');
const db = {};

let sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  port: config.mysql.port,
  dialect: 'mysql',
  logging: function (output) {
    if (config.mysql.logging) {
      logging.info(output);
    }
  }
});

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== -1) && (file !== 'index.js');
}).forEach(file => {
  let model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = {
  sequelize,
  Sequelize,
  db
};
