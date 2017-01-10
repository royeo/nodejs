var fs = require('fs'),
stat = fs.stat;

var copy = function (src, dst) {
    fs.readdir(src, function (err, paths) {
        if(err) {
            throw err;
        }
        
        paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writeable;

            stat(_src, function (err, st) {
                if(err) {
                    throw err;
                }

                if(st.isFile()) {
                    readable = fs.createReadStream(_src);
                    writeable = fs.createWriteStream(_dst);
                    readable.pipe(writeable);
                } else if(st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });    
};

var exists = function (src, dst, callback) {
    fs.exists(dst, function (exists) {
        if(exists) {
            callback(src, dst);
        } else {
            fs.mkdir(dst, function () {
                callback(src, dst);
            });
        }
    });
}

exists(__dirname + '/oldPath', __dirname + '/newPath', copy);