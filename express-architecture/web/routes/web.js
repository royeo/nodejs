'use strict';

const controller = require('../middlewares/dispatch');

module.exports = function (router) {
  router.get('/', controller.home);
};
