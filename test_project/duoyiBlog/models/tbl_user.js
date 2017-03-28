'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    userID: {
      field        : 'user_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : true,
      autoIncrement: true,
      allowNull    : false,
      comment      : '用户ID'
    },
    userName: {
      field        : 'user_name',
      type         : DataTypes.STRING(50),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '用户名'
    },
    userPassword: {
      field        : 'user_password',
      type         : DataTypes.STRING(100),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '用户密码'
    },
    signupTime: {
      field        : 'signup_time',
      type         : DataTypes.BIGINT,
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '注册时间'
    }
  }, {
    tableName      : 'tbl_user',
    freezeTableName: true,
    timestamps     : false
  });
};
