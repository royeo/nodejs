'use strict';

const web = require('../../../controllers/v1/web/web');

module.exports = function (router) {
  router.get('/', web.index);
  router.get('/detail', web.detail);
};
