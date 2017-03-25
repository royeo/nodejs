// 由于 attributes.js 被 attributes_require.js 调用，所以 parent 属性指向 attributes_require.js 模块，id 属性和 filename 属性一致，都是模块的绝对路径
const a = require('./attributes');