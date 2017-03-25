//exec用来创建一个进程执行指定的命令，原理是启动了一个系统shell来解析参数，可以接受一个回调函数作为参数
let options = {
    encoding: 'utf8',   //I/O流的编码格式；
    timeout: 0,     //进程超时时间；
    maxBuffer: 200 * 1024,  //stdout或stderr可增长的最大值；
    killSignal: 'SIGTERM',  //当时间或者缓冲区超限时终止进程的信号；
    setsid: false,  //决定在进程中是否创建一个新的会话；
    cwd: null,  //进程的初始工作目录，为null时表示使用node的当前工作目录；
    env: null   //进程的环境变量。
};

const cp = require('child_process');
cp.exec('dir /b', options, function(e, stdout, stderr) {
    if(!e) {
        console.log(stdout);
        console.log(stderr);
    }
});