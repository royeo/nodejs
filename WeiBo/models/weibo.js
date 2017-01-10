/**
 * Created by duoyi on 2016/8/24.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('weibo', {
        id: {
            field:'id',
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "微博id"
        },
        user_id: {
            field:'userId',
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户id"
        },
        content: {
            field:'content',
            type: DataTypes.STRING(140),
            allowNull: false,
            comment: "微博内容"
        },
        img_url: {
            field:'imgUrl',
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "图片"
        },
        time: {
            field:'time',
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "排行版类型"
        },
        type: {
            field:'type',
            type: DataTypes.STRING(8),
            allowNull: false,
            comment: "微博类型"
        }
    },{
        tableName:'weibo',
        freezeTableName:true,
        timestamps:false
    })
};
