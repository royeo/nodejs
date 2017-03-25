// fork.js引用
process.on('message', function (msg) {
    console.log(msg);
});
process.send('son : hello parent');