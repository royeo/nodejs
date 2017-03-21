const fs = require('fs');
const path = require('path');

function mkdirs(dirpath, mode, callback) {
    fs.exists(dirpath, (exists) => { //检查指定路径文件或目录是否存在
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirpath), mode, () => {
                console.log(path.dirname(dirpath));
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
}

mkdirs(__dirname + '/123/456/789', "777", (err, dir) => {
    if (err) {
        console.log(err);
        return;
    }
});