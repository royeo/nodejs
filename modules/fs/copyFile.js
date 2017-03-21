const fs = require('fs');

const copy = (src, dst) => {
    fs.readdir(src, (err, paths) => {
        if (err) throw err;

        paths.forEach((path) => {
            let _src = src + '/' + path;
            let _dst = dst + '/' + path;

            fs.stat(_src, (err, st) => {
                if (err) throw err;

                if (st.isFile()) {
                    let readable = fs.createReadStream(_src);
                    let writeable = fs.createWriteStream(_dst);
                    readable.pipe(writeable);
                } else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
};

const exists = (src, dst, callback) => {
    fs.exists(dst, (exists) => {
        if (exists) {
            callback(src, dst);
        } else {
            fs.mkdir(dst, () => {
                callback(src, dst);
            });
        }
    });
}

exists(__dirname + '/oldPath', __dirname + '/newPath', copy);