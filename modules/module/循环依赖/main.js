// 当 main.js 加载 a.js 时，a.js 又加载 b.js。 此时，b.js 会尝试去加载 a.js。 
// 为了防止无限的循环，会返回一个 a.js 的 exports 对象的 未完成的副本 给 b.js 模块。 
// 然后 b.js 完成加载，并将 exports 对象提供给 a.js 模块。
console.log('main 开始');
const a = require('./a.js');
const b = require('./b.js');
console.log(`在 main 中，a.done=${a.done}, b.done=${b.done}`); 