// 第一次加载模块后给模块添加一个属性
// 重新加载后还能使用这个属性，说明第一次加载后重新加载的第一次的缓存
let man = require('./c');
console.log(man.name);
man.age = 22;
let woman = require('./c');
console.log(woman.age);