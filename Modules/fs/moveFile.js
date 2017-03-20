var fs = require('fs');

fs.rename(__dirname + '/oldPath/oldDir', __dirname + '/newPath/oldDir', function (err) {
    if(err) {
        return console.error(err);
    }

    console.log("success move file!");
})
