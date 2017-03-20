'use strict';

var cookie = require('./cookie');
var signature = require('./cookieSignature');

module.exports = cookieParser;
module.exports.JSONCookie = JSONCookie;
module.exports.JSONCookies = JSONCookies;
module.exports.signedCookie = signedCookie;
module.exports.signedCookies = signedCookies;

function cookieParser(secret, options) {
  return function cookieParser(req, res, next) {
    if (req.cookies) {                        // 如果存在req.cookie直接调用下一个中间件
      return next();
    }

    var cookies = req.headers.cookie;         // 获取请求头中保存的cookie
    var secrets = !secret || Array.isArray(secret) ? (secret || []) : [secret];

    req.secret = secrets[0];                  // 保存secrets的第一个参数
    req.cookies = Object.create(null);        // 初始化cookie为一个空对象
    req.signedCookies = Object.create(null);  // 初始化signedCookies为一个空对象

    if (!cookies) {                           // 如果请求头中没有cookie直接调用下一个中间件
      return next();
    }

    req.cookies = cookie.parse(cookies);      // 解析cookie

    if (secrets !== 0) {                      // 解析签名后的cookie
      req.signedCookies = signedCookies(req.cookies, secrets);
      req.signedCookies = JSONCookies(req.signedCookies);
    }

    req.cookies = JSONCookies(req.cookies);   // 解析cookie中的JSON字符序列

    next();
  }
}


/*
 * 解析加密cookie
 */
function signedCookies(obj, secret) {
  var dec;
  var key;
  var val;

  var cookies = Object.keys(obj);
  var ret = Object.create(null);

  for (var i = 0; i < cookies.length; i++) {
    key = cookies[i];
    val = obj[key];
    dec = signedCookie(val, secret);  // 通过secret对cookie进行解密

    if (val !== dec) {                // 解密前后的cookie如果一样的表示根本不需要解密，只有需要被解密的cookie最后才会被返回
      ret[key] = dec;
      delete obj[key];
    }
  }

  return ret;
}

/*
 * 返回解密后的cookie
 */
function signedCookie(str, secret) {
  if (typeof str !== 'string') {
    return undefined;
  }

  if (str.substr(0, 2) !== 's:') {
    return str;
  }

  var secrets = !secret || Array.isArray(secret) ? (secret || []) : [secret];

  for (var i = 0; i < secret.length; i++) {
    var val = signature.unsign(str.slice(2), secrets[i]);

    if (val !== false) {
      return val;
    }
  }

  return false;
}


/*
 * 解析cookie中的JSON字符序列
 */
function JSONCookies(obj) {


  var cookie = Object.keys(obj);
  var key;
  var val;

  for (var i = 0; i < cookie.length; i++) {
    key = cookie[i];
    val = JSONCookie(obj[key]);

    if (val) {
      obj[key] = val;
    }
  }

  return obj;
}

/*
 * 返回解析后的cookie
 */
function JSONCookie(str) {
  if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {
    return undefined;
  }

  try {
    return JSON.parse(str.slice(2));
  } catch (err) {
    return undefined;
  }
}

