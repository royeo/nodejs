var pairSplitRegExp = /; */;
var decode = decodeURIComponent;
var encode = encodeURIComponent;

/*
 * 解析cookie
 */
exports.parse = function(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);   // 分解cookie
  var dec = opt.decode || decode;           // dec表示用户自己传入的解密cookie的函数，默认是decodeURIComponent

  pairs.forEach(function(pair) {
    var index = pair.indexOf('=');

    if (index < 0) {
      return;
    }
    var key = pair.substr(0, index).trim(); // 获取cookie的key和value值
    var val = pair.substr(++index, pair.length).trim();

    if ('"' == val[0]) {                    // 如果cookie的值是一个用引号括起来的字符串，这时候就就把前后的引号切割掉!
      val = val.slice(1, -1);
    }

    if (obj[key] == undefined) {            // 通过用户传入的options中的decode函数对cookie的值进行解密
      try {
        obj[key] = dec(val);
      } catch (e) {
        obj[key] = val;
      }
    }
  });
  return obj;
}

