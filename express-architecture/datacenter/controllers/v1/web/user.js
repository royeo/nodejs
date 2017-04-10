'use strict';

const userService = require('../../../services/user');

module.exports = handleError({
  login,
  reg,
  logout
});

function login(req, res, next) {
  let name = req.query.name;
  return userService.getPassword({name})
    .then(data => next({code: 200, ext: data}));
}

function reg(req, res, next) {

}

function logout(req, res, next) {

}
