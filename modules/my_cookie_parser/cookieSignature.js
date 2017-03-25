var crypto = require('crypto');

/*
 * 加密
 */
exports.sign = function(val, secret){
  if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
  if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");

  return val + '.' + crypto     // 最后加密过的字符串是中间包含一个点的字符串，加密结果是:"明文.sha256编码的密文"， 通过sha256进行编码
      .createHmac('sha256', secret)
      .update(val)
      .digest('base64')
      .replace(/\=+$/, '');
};


/*
 * 解密
 */
exports.unsign = function(val, secret){
  if ('string' != typeof val) throw new TypeError("Signed cookie string must be provided.");
  if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
  var str = val.slice(0, val.lastIndexOf('.'))      // 获取最后一个点号前面的字符作为我们要解密的cookie的签名
    , mac = exports.sign(str, secret);              // 将点号前面的字符进行加密
  return sha1(mac) == sha1(val) ? str : false;      // 对比需要解密的val和对明文加密后的结果mac
};


/*
 * sha1算法
 */
function sha1(str){
  return crypto.createHash('sha1').update(str).digest('hex');
}
