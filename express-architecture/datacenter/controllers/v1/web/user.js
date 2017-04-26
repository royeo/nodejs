'use strict';

const userService = require('../../../services/user');

module.exports = handleError({
  login,
  reg,
  logout
});

async function login(req, res, next) {
  let name = req.query.name;
  let data = await userService.getPassword({name})
  return next({code: 200, ext: data});
}

function reg(req, res, next) {

}

function logout(req, res, next) {

}
