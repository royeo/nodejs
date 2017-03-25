// 所有的模块都是 Module 的实例。当前模块也是 Module 的一个实例。
console.log('module.id: ', module.id);
console.log('module.exports: ', module.exports);
console.log('module.parent: ', module.parent);
console.log('module.filename: ', module.filename);
console.log('module.loaded: ', module.loaded);
console.log('module.children: ', module.children);
console.log('module.paths: ', module.paths);

// 根据结果可以看出，如果没有父模块，直接调用当前模块
// parent 属性就是 null
// id 属性就是一个点
// filename 属性是模块的绝对路径
// path 属性是一个数组，包含了模块可能的位置
// 另外，输出这些内容时，模块还没有全部加载，所以 loaded 属性为 false 。