'use strict';

const userService = require('../../../services/user');
const paramValidator = require('../../../middlewares/param-validator/index2');

module.exports = handleError({
  login,
  reg,
  logout
});

async function login(req, res, next) {
  let schema = {
    demo: {in: 'query', isInt: {options: {max: 3, min: 1}}, defaultValue: 2, notEmpty: true},
    name: {in: 'body', notEmpty: true},
    password: {in: 'body', notEmpty: true}
  }
  let validatorResult = await paramValidator(schema, req);
  if (validatorResult.name) {
    return next(validatorResult);
  }
  let {name, password} = req.body;
  let userInfo = await userService.verifyAccount({name, password});
  if (userInfo) {
    return next({code: 200, msg: '登录成功', ext: userInfo});
  }
  return next({code: 200, msg: '登录失败'});
}

async function reg(req, res, next) {
  let {name, password} = req.body;
  await userService.regAccount({name, password});
  return next({code: 200, msg: '注册成功'});
}

function logout(req, res, next) {

}
