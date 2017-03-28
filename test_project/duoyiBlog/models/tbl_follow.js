'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Follow', {
    followID: {
      field        : 'follow_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : true,
      autoIncrement: true,
      allowNull    : false,
      comment      : '关注ID'
    },
    masterID: {
      field        : 'master_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '被关注人ID'
    },
    followerID: {
      field        : 'follower_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '关注人ID'
    }
  }, {
    tableName      : 'tbl_follow',
    freezeTableName: true,
    timestamps     : false
  });
};
