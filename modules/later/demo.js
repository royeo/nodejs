const later = require('later');
let basic = {h:[13], m:[34]};  //设置执行时间
let composite = [
    basic
];
var exception = [   // 用于设置无效日期
    {M: [1]},
    {dw: [1,6,7]}
];
let sched = {
    schedules:composite,
    exception
};

later.date.localTime();  //设置本地时区

let t = later.setInterval(function(){
    console.log("asdasd");
}, sched);