const Redis = require('ioredis');
let redis = new Redis();

redis.set('name', 'xiaoming');
redis.get('name', (err, result) => {
  console.log('name: ', result);
});

redis.set('age', 22);
redis.get('age').then(result => {
  console.log('age: ', result);
});

redis.set('buf', new Buffer('buffer'));
redis.getBuffer('buf', function (err, result) {
  console.log(result);
});