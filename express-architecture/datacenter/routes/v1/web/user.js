'use strict';

const user = require('../../../controllers/v1/web/user');

module.exports = function (router) {
  router.post('/login', user.login);
  router.post('/reg', user.reg);
  router.post('/logout', user.logout);
};
