'use strict';

// 定义表结构
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      autoIncrement: false,
      allowNull: false,
      commemt: '姓名'
    },
    email: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      autoIncrement: false,
      allowNull: false,
      commemt: '邮箱'
    },
    password: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      autoIncrement: false,
      allowNull: false,
      commemt: '密码'
    }
  }, {
    // 设置表名跟定义的一样，如果不设置，默认会加s,如 'users'。
    tableName: 'user',
    freezeTableName: true,
    timestamps: false
  });
};
