'use strict';

const http = require('http');
const debug = require('debug')('middlewares:finallyResp');

const codeToStatus = require('./defines').codeToStatus;

const JSONSTRING = 'JSONString';
const ENCONDING = 'utf8';

module.exports = function (options) {
  options = options || {};
  let defaultFormat = options.format || JSONSTRING;
  let enconding = options.enconding || ENCONDING;
  let views = options.views;

  return function finallyResp(result, req, res, next) {
    if (_.isError(result)) {
      result = {
        status : 'error',
        code   : 500,
        err    : result,
        msg    : result.message
      };
    }
    debug('finallyResp', result);
    let final = codeToStatus[result.code];

    if (!final) {
      throw new Error('result.code undefined!');
    }

    let url = req.url;
    let msg = result.msg || final.desc;
    let ext = result.ext || {};
    let view = result.view || views[final.statusCode] || final.view;
    let page = result.page;
    let err = result.err;
    let desc = result.desc || final.desc;

    function dealError(statusCode, err, view) {
      res.status(statusCode);
      let errorView = result.errorView || views[statusCode] || view;
      if (!errorView) {
        res.end(http.STATUS_CODES[statusCode]);
      } else {
        res.render(errorView, {msg: msg, err: err});
      }
    }

    function logAndDealError(url, statusCode, err, view) {
      logError(url, err);
      dealError(statusCode, err, view);
    }

    if (view) {
      if (err) {
        logAndDealError(url, 500, err, view);
      } else {
        res.render(view, msg, (err, html) => {
          if (err) {
            logAndDealError(url, 500, err, view);
          } else {
            res.send(html);
          }
        });
      }
    } else if (page) {
      try {
        res.send(page);
      } catch (err) {
        logAndDealError(url, 404, err);
      }
    } else {
      if (err) {
        logError(url, err);
      }
      let retObj = {
        RetSucceed : true,
        Succeed    : final.succeed,
        Code       : final.code,
        Desc       : desc,
        Message    : msg,
        ExtData    : ext
      };

      let format = result.format || req.query.format || defaultFormat;
      if (format === JSONSTRING) {
        res.send(JSON.stringify(retObj));
      } else {
        res.json(retObj);
      }
    }
  };
};

function logError(url, err) {
  if (err instanceof Error || _.isError(err)) {
    logger.error(`\n\n--------------------Error Begin--------------------\n\n${url}\n${err.stack}\n\n--------------------Error End--------------------\n`);
  } else {
    logger.warn(`\nWarn Begin\n#${err}\n${url}\nWarn End`);
  }
}
