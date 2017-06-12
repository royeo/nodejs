'use strict';

// 定义表结构
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      commemt: '价格'
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      commemt: '数量'
    }
  }, {
    // 设置表名跟定义的一样，如果不设置，默认会加s,如 'users'。
    tableName: 'product',
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function (models) {
        models.User.hasOne(models.Product, {
          as: 'Product',
          foreignKey: 'user_id',
          onDelete: 'CASCADE'
        });
      }
    }
  });
};
