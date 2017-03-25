// fork函数，用于在子进程中运行的模块，如 fork(‘./son.js’) 相当于 spawn(‘node’, [‘./son.js’]) 。
// 与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
const childProcess = require('child_process');
const dad = childProcess.fork('./fork_child.js');   // fork_son.js为要在子进程中运行的模块

dad.on('message', function (msg) {
    console.log(msg);
});

dad.send('parent : hello son');