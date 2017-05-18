// 'use strict';

// const expressValidator = require('express-validator');
// const validateConf = require('./config');
// const validateMods = require('../../validations');
// const sanitizeMap = {
//   isInt: 'toInt',
//   isFloat: 'toFloat',
//   isDate: 'toDate',
//   isArray: 'toArray',
//   isIntArray: 'toIntArray'
// };


// // 初始化参数验证中间件
// module.exports = function(router) {
//   router.use(expressValidator(validateConf));
//   // 遍历 Validation 下每一个 api validation，并初始化对应的路由中间件
//   _.map(validateMods, (mod) => {
//     _.map(mod, (api) => {
//       let {method, route, schema} = api;
//       router[method](route, addDefaultValue(schema), validateReq(schema));
//     });
//   });
// };

// // 根据 schema 验证 req 表单
// function validateReq(schema) {
//   return async function (req, res, next) {
//     if (req.checked) {
//       return next();
//     }
//     let newSchema = _.cloneDeep(schema);
//     for (let key in newSchema) {
//       if (_.has(newSchema[key], 'defaultValue')) {
//         delete newSchema[key].defaultValue;
//       }
//     }
//     req.check(newSchema);
//     let result = await req.getValidationResult();
//     if (!result.isEmpty()) {
//       let errors = result.useFirstErrorOnly().array();
//       let errMsg = `参数${errors[0].param}验证错误`;
//       return next({code: 500, msg: errMsg});
//     } else {     
//       reqFilter(schema, req, next);
//     }
//   };
// }

// // 根据 schema 过滤 req 参数
// function reqFilter(schema, req, next) {
//   ['query', 'params', 'body'].map((paramForm) => {
//     Object.keys(req[paramForm]).map((key) => {
//       let param = schema[key];
//       if (!(param && param.in && param.in === paramForm)) {
//         return delete req[paramForm][key];
//       }

//       // 遍历 sanitizeMap, 查找 schema 验证的字段有没有对应的验证类型，如果有，则调用数据转换方法
//       for (let sanitizeKey in sanitizeMap) {
//         if (param[sanitizeKey]) {
//           req.sanitize(key)[sanitizeMap[sanitizeKey]]();
//         }
//       }
//     })
//   })
//   req.checked = true; // 防止进入其他路由
//   return next();
// }


// // 根据 schema 定义添加默认值
// function addDefaultValue(schema) {
//   return function (req, res, next) {
//     for (let key in schema) {
//       if (_.has(schema[key], 'defaultValue') && schema[key].in) {
//         req[schema[key].in][key] = req[schema[key].in][key] ? req[schema[key].in][key] : schema[key].defaultValue;
//       }
//     }
//     return next();
//   };``
// }
