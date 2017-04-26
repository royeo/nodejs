'use strict';

const userApi = {
  login: '/webapi/v1/user/login',
  reg: '/webapi/v1/user/reg',
  logout: '/webapi/v1/user/logout'
};

const userBase = {
  name: {
    in: 'body',
    isLength: {
      options: {max: 50},
      errorMessage: 'name最大长度为50'
    },
    notEmpty: true,
    optional: true,
    errorMessage: 'name不能为空'
  },
  password: {
    in: 'body',
    isLength: {
      options: {max: 50},
      errorMessage: 'password最大长度为50'
    },
    notEmpty: true,
    optional: true,
    errorMessage: 'password不能为空'
  }
};

exports.user = {
  login: {
    route: userApi.login,
    method: 'post',
    schema: _.pick(userBase, ['name', 'password'])
  },
  reg: {
    route: userApi.reg,
    method: 'post',
    schema: _.pick(userBase, ['name', 'password'])
  },
  logout: {
    route: userApi.logout,
    method: 'post',
    schema: _.pick(userBase, ['name'])
  }
};
