'use strict';

const userService = require('../../../services/user');

module.exports = handleError({
  login,
  reg,
  logout
});

async function login(req, res, next) {
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
