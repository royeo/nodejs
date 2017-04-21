const Redis = require('ioredis');
let redis = new Redis();
let pub = new Redis();

redis.subscribe('news', 'music', (err, count) => {
  pub.publish('news', 'Hello');
  pub.publish('music', 'Hi');
});

redis.on('message', (channel, message) => {
  // Receive message Hello world! from channel news
  // Receive message Hello again! from channel music
  console.log(`Receive message ${message} from channel ${channel}`);
});

// There's also an event called 'messageBuffer', which is the same as 'message' except
// it returns buffers instead of strings.
redis.on('messageBuffer', (channel, message) => {
  // Both `channel` and `message` are buffers.
  console.log('Get it.');
});