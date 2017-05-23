'use strict';

const http = require('http');
const debug = require('debug')('middlewares:finallyResp');

const codeToStatus = require('./defines').codeToStatus;

const JSONSTRING = 'JSONString';
const ENCONDING = 'utf8';

/**
 * finallyResp
 * @param {Object} options
 * @param {Object} [options.format='JSONString'] - 默认接口返回的数据格式 JSON 或 JSONString
 * @param {Object} [options.enconding='utf8']    - 默认接口返回的数据编码
 * @param {Object} [options.views]               - 默认模板，如 view[500] = '500.ejs'
 * @returns {Function}
 */
module.exports = function (options) {
  options = options || {};
  let defaultFormat = options.format || JSONSTRING;
  let enconding = options.enconding || ENCONDING;
  let views = options.views;

  /**
   * finallyResp
   * @param {Object}          result              - 处理前的结果对象
   * @param {String}          result.status       - 状态
   * @param {*}               result.msg          - 数据
   * @param {*}               result.ext          - 扩展
   * @param {Error|String}    result.err          - 错误
   * @param {String}          result.desc         - 描述
   * @param {String}          result.view         - 视图模板（渲染成功）
   * @param {String}          result.errorView    - 视图模板（渲染出错）
   * @param {String}          result.page         - 静态文件路径
   * @param {http.Request}    req                 - http.Request
   * @param {http.Reponse}    res                 - http.Response
   * @param {Function}        next                - app.next
   * @returns {*}
   */
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

    let url  = req.url;
    let msg  = result.msg || final.desc;
    let ext  = result.ext || {};
    let view = result.view || views[final.statusCode] || final.view;
    let page = result.page;
    let err  = result.err;
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
      } catch (e) {
        logAndDealError(url, 404, e);
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
    logger.error(`\n\nError Begin\n\n${url}\n${err.stack}\n\nError End\n`);
  } else {
    logger.warn(`\nWarn Begin\n#${err}\n${url}\nWarn End`);
  }
}
