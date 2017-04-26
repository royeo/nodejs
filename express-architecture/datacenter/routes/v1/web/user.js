'use strict';

const user = require('../../../controllers/v1/web/user');

module.exports = function (router) {
  router.post('/user/login', user.login);
  router.post('/user/reg', user.reg);
  router.post('/user/logout', user.logout);
};
