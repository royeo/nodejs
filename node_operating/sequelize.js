const Sequelize = require('sequelize');

// 连接数据库
const sequelize = new Sequelize('test', 'root', '123');

// 导入模型
const User = sequelize.import('./sequelize_model');

// 创建表并写入内容
User.sync({force: false}).then(function() {
  return User.create({
    firstName: 'little',
    lastName: 'du'
  })
});
