// child_process.exec() 和 child_process.execFile() 之间的重大区别会根据平台的不同而不同。 
// 在类 Unix 操作系统上（Unix、 Linux、 OSX），child_process.execFile() 效率更高，因为它不需要衍生一个 shell。 
// 但是在 Windows 上，.bat 和 .cmd 文件在没有终端的情况下是不可执行的，因此不能使用 child_process.execFile() 启动。
// window下可以通过使用设置了 shell 选项的 child_process.spawn()、或使用 child_process.exec()

const spawn = require('child_process').spawn;
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.log(data.toString());
});

bat.on('exit', (code) => {
  console.log(`子进程退出码：${code}`);
});

// 或
const exec = require('child_process').exec;
exec('my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});