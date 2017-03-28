'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Like', {
    likeID: {
      field        : 'like_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : true,
      autoIncrement: true,
      allowNull    : false,
      comment      : '点赞ID'
    },
    weiboID: {
      field        : 'weibo_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '微博ID'
    },
    userID: {
      field        : 'user_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '点赞人ID'
    }
  }, {
    tableName      : 'tbl_like',
    freezeTableName: true,
    timestamps     : false
  });
};
