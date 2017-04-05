'use strict';

// 定义表结构
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    //设置表名跟定义的一样，如果不设置，默认会加s,如 'users'。
    freezeTableName: true
  });
};