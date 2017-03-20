var req=require("express/lib/request")


if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) continue;
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
        }
      }
      return to;
    }
  });
}

/**
 *
 * @param req request对象
 * @param keys 将要获取的keys
 * @param requiredKeys  必须要的keys
 * @returns {{!null:由keys为key的对象;
 *            null:缺少必要参数}}
 */
var getParams=function(req,keys,requiredKeys){
//    var queryP=req.query;
//    var bodyP=req.body;
    var params=Object.assign(req.query,req.body);
    var paramObj={}
    if (Array.isArray(keys)) {
      for (key in keys) {
        if (params.hasOwnProperty(key))
          paramObj[key] = params[key];
      }
    }else{
      return null;//需要获取的keys不能为空
    }
    if (Array.isArray(requiredKeys)) {
      for (key in requiredKeys) {
        if (!(paramObj.hasOwnProperty(key) && paramObj[key]))
          return "参数错误,缺少"+key;
      }
    }
    return paramObj;
}

module.exports={
  getParams:getParams
}

