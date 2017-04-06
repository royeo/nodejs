'use strict';

const web = require('../controllers/web');

module.exports = function (router) {
  router.get('/', web.index);
  router.get('/help', web.help);
};
