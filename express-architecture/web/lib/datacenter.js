'use strict';

const requirePromise = require('request-promise');
const rpweb = requirePromise.defaults({
  baseUrl: config.apiServerUrl.webApiV1,
  json: true,
  timeout: 60000
});

module.exports = {
  apiPipe,
  getDataForRenderPage
};

function apiPipe(options) {
  return rpweb(options)
    .then(body => {
      return body.Code === 200 ? body.Message : Promise.reject(new Error(body.Message));
    });
}

function getDataForRenderPage(res, dataInterfaces) {
  return Promise.map(dataInterfaces, dataInterface => {
    return rpweb.get({
      uri: dataInterface.url,
      qs: dataInterface.params
    }).then(body => {
      if (body.Code === 200) {
        res.locals[dataInterface.resName] = body.Message;
      } else {
        return Promise.reject(new Error(body.Message));
      }
    });
  });
}
