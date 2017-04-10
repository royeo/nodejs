'use strict';

const admin = require('../../../controllers/v1/admin/admin');

module.exports = function (router) {
  router.get('/', admin.index);
  router.get('/detail', admin.detail);
};
