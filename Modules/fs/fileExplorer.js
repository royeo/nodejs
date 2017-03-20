var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;
var stats = [];

fs.readdir(process.cwd(), function (err, files) {
    if(!files.length) {
        return console.log('No files to show!');
    }

    console.log(' Select which file or directory you want to see\n');

    function file(i) {
        var filename = files[i];

        fs.stat(__dirname + '/' + filename, function (err, stat) {
            stats[i] = stat;        //保存文件的属性
            if(stat.isDirectory()) {        //判断是文件还是目录，以不同形式显示
                console.log('   ' + i + ' \033[036m' + filename + '/\033[39m');
            } else {
                console.log('   ' + i + ' \033[090m' + filename + '\033[39m');
            }

            i++;

            if(i == files.length) {
                read();     //读取文件
            } else {
                file(i);
            }
        });
    }

    file(0);

    stdin.setEncoding('utf8');
    stdin.on('data', option);

    function read() {
        console.log('');
        stdout.write('  \033[33mEnter your choice : \033[39m');     //与console.log的区别是不会在后面加'\n'
        stdin.resume();

    }

    function option(data) {
        var filename = files[Number(data)];
        if(!files[Number(data)]) {      //输入的不是数字或超过files数组的范围
            stdout.write('  \033[31mEnter your choice : \033[39m');
        } else {
            stdin.pause();
            if(stats[Number(data)].isDirectory()) {
                fs.readdir(__dirname + '/' + filename, function (err, files) {
                    console.log('');
                    console.log('   (' + files.length + ' files)');
                    files.forEach(function (file) {
                        console.log('   -  ' + file);
                    })
                    console.log('');
                    return read();
                });
            } else {
                fs.readFile(__dirname + '/' + filename, 'utf8', function (err, data) {
                    console.log('');
                    console.log('   ' + data);
                    return read();
                });
            }
        }
    }

});



