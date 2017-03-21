const fs = require('fs');

fs.rename(__dirname + '/oldPath/oldFile.txt', __dirname + '/newPath/oldFile.txt', (err) => {
    if (err) {
        return console.error(err);
    }

    console.log("success move file!");
});