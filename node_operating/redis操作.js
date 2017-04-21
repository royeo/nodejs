const Redis = require('ioredis');
let redis = new Redis();

// 字符串
redis.set('key', '123');
redis.get('key', (err, result) => {
    console.log(result);
});
redis.get('key').then((result) => {
    console.log(`Promise: ${result}\n`);
});

// 集合
redis.sadd('set1', 1, 3, 5, 7);
redis.smembers('set1', (err, result) => {
    console.log(result);
});
redis.sadd('set2', [2, 4, 6, 8]);
redis.smembers('set2', (err, result) => {
    console.log(result);
});
redis.smembers('set2').then((result) => {
    console.log(`Promise: ${result}\n`);
});

// 二进制数据
redis.set('buf', new Buffer('value'));
redis.getBuffer('buf').then((result) => {
    console.log(result);
})