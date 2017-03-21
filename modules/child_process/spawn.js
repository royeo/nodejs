//child_process.span会返回一个带有stdout和stderr流的对象。你可以通过stdout流来读取子进程返回给Node.js的数据。
//stdout拥有’data’,’end’以及一般流所具有的事件。当你想要子进程返回大量数据给Node时，比如说图像处理，读取二进制数据等等，你最好使用spawn方法。
var spawn = require('child_process').spawn,
    free = spawn('node', ['./child.js']);

// 捕获标准输出并将其打印到控制台
free.stdout.on('data', function (data) {
    console.log('标准输出：\n' + data);
});

// 捕获标准错误输出并将其打印到控制台
free.stderr.on('data', function (data) {
    console.log('标准错误输出：\n' + data);
});

// 注册子进程关闭事件
free.on('exit', function (code, signal) {
    console.log('子进程已退出，代码：' + code);
});

