'use strict';

const base = [

  // 字段说明
  //     statusCode: HTTP状态码
  //     succeed: 表示是否达到预期
  //     code: 返回码，成功返回0，失败返回不同的数字变化
  //     status: 状态，与code对应
  //     desc: 对应code和status的描述
  
  // 如果客户端或浏览器只关心成功或失败：
  //     判断 succeed 是否为 true 或者 判断 code 是否为 0
  //
  // 如果客户端或浏览器关心失败的具体原因：
  //     通过 code 获取具体原因，并给出相关提示语
  //
  // desc 字段用于给调用方查看错误原因，而不是用于给用户的提示语，此字段又可能会不返回
  {statusCode: 200, succeed: true, code: 200, status: '', desc: 'success'},
  {statusCode: 500, succeed: false, code: 500, status: '', desc: ''},
  {statusCode: 404, succeed: true, code: 404, status: '', desc: 'The interface does not exist'},
  {statusCode: 403, succeed: true, code: 403, status: 'noAuth', desc: 'Verify that it does not pass or has no permissions'}
];

const statusToCode = {};
const codeToStatus = {};

base.forEach(item => {
  statusToCode[item.status] = codeToStatus[item.code] = item;
});

module.exports = {
  statusToCode,
  codeToStatus
};

