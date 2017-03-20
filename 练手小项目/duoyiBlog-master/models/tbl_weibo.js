'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Weibo', {
    weiboID: {
      field        : 'weibo_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : true,
      autoIncrement: true,
      allowNull    : false,
      comment      : '微博ID'
    },
    userID: {
      field        : 'user_id',
      type         : DataTypes.INTEGER(11),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '用户ID'
    },
    weiboContent: {
      field        : 'weibo_content',
      type         : DataTypes.STRING(140),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '微博内容'
    },
    weiboImage: {
      field        : 'weibo_image',
      type         : DataTypes.TEXT,
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '微博图片'
    },
    weiboType: {
      field        : 'weibo_type',
      type         : DataTypes.INTEGER(11),
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '微博类型，0为原始微博，非0为转发微博'
    },
    weiboTime: {
      field        : 'weibo_time',
      type         : DataTypes.BIGINT,
      primaryKey   : false,
      autoIncrement: false,
      allowNull    : false,
      comment      : '微博创建时间'
    }
  }, {
    tableName      : 'tbl_weibo',
    freezeTableName: true,
    timestamps     : false
  });
};
