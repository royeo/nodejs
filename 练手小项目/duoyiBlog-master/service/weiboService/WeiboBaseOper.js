var Promise=require('bluebird');
var db=require('../../models').Weibo;
var pusher=require('../service/pushService')
/**
 *校验一条微博是否需要被过滤并完成orm对象转换
 * @param instance 待校验对象
 * @return obj:微博无需过滤
 *         string:错误信息
 */
var validInstance=function(instance){
  //之后再行添加时候符合业务逻辑的判断
  try{
    var ins={};
    ins.weiboContent=instance["content"];
    ins.weiboImage=instance.images;
    var type=instance.type;
    ins.weboType=parseInt(type);
    ins.weiboTime=Date.now();
    return ins;
  }catch(ex){
    return ex.message
  }

}

/**
 *
 * @param instance 前端接收的实例
 * @returns {*}
 */
var create=function(instance){
  var ins=validInstance(instance);
  if (typeof(ins)==='string')
    return Promise.reject(ins);
  return  db.create(ins).tap(function(){
    return pusher.notifyNewWeibo(); //推送消息
  });
}

module.exports={
  create:create
}