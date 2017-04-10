'use strict';

const datacenter = require('../lib/datacenter');
const getDataForRenderPage = datacenter.getDataForRenderPage;
const apiPipe = datacenter.apiPipe;

module.exports = {
  home,
  getUserInfo
};

function home(req, res, next) {
  let dataInterfaces = [{
    url: '/test',
    params: {},
    resName: 'test'
  }];
  return getDataForRenderPage(res, dataInterfaces)
    .then(() => next({view: 'web/index'}))
    .catch(err => {
      logger.error(err);
      next({status: 'pageNotFound', view: '404'});
    });
}

function getUserInfo(req, res, next) {

}
