'use strict';

const userService = require('../../../services/user');
const handleError = require('../../../middlewares/error-handle');
const paramValidator = require('../../../middlewares/param-validator');

module.exports = handleError({
  login,
  reg,
  logout
});


/**
 * 登录
 * 
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
async function login(req, res, next) {
  let schema = {
    demo     : {in: 'query', isInt: {options: {max: 3, min: 1}}, defaultValue: 2, optional: true},
    name     : {in: 'body', isLength: {options: {max: 20}}, notEmpty: true},
    password : {in: 'body', isLength: {options: {max: 20}}, notEmpty: true}
  };
  await paramValidator(schema, req);
  let {name, password} = req.body;
  let a = await userService.getProduct();
  let userInfo = await userService.verifyAccount({name, password});
  if (userInfo) {
    return next({code: 200, msg: '登录成功', ext: userInfo});
  }
  return next({code: 200, msg: '登录失败'});
}

/**
 * 注册账号
 * 
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
async function reg(req, res, next) {
  let {name, password} = req.body;
  await userService.regAccount({name, password});
  return next({code: 200, msg: '注册成功'});
}

function logout(req, res, next) {

}
