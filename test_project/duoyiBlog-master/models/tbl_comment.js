'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Comment', {
    commentID: {
      field        : 'comment_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : true,
      autoIncrement: true,
      allowNull    : false,
      comment      : '评论ID'
    },
    commentContent: {
      field        : 'comment_content',
      type         : DataTypes.STRING(140),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '评论内容'
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
      comment      : '评论人ID'
    }
  }, {
    tableName      : 'tbl_comment',
    freezeTableName: true,
    timestamps     : false
  });
};
