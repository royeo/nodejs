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
      allowNull: false,
      commemt: '姓名'
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      commemt: '密码'
    },
    createTime: {
      field: 'create_time',
      type: DataTypes.BIGINT(20),
      allowNull: false,
      commemt: '创建时间',
      // 在create的时候如果createTime没有值，则会使用defaultValue
      defaultValue: function () {
        return Date.now();
      }
    }
  }, {
    // 设置表名跟定义的一样，如果不设置，默认会加s,如 'users'。
    tableName: 'user',
    freezeTableName: true,
    timestamps: false
  });
};
