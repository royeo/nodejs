const Promise = require('bluebird');

function makePromise(index, delay) {
  return new Promise((resolve) => {
    console.log(`${index} started.`);
    setTimeout(() => {
      console.log(`${index} completed.`);
      resolve(index);
    }, delay);
  });
}

let data = [2000, 1, 1000];

// Promise.all：等待多个 Promise 实例执行完成
Promise.all(data.map((item, index) => makePromise(index, item))).then((res) => console.log(res));

// Promise.map：可以用于替数组 .push + Promise.all 方法：
// concurrency参数是控制同时并发创建的Promise个数，并且是不保证顺序的，所以当{concurrency: 1}时，只会有一个Promise在运行，但是整个数组不保证是从左到右顺序执行的。
Promise.map(data, (item, index) => makePromise(index, item), {concurrency: 1}).then(res => console.log(res));

// Promise.reduce：顺序执行，始终只有一个 Promise 在运行
// Promise.mapSeries 和 Promise.each 都是基于 Promise.reduce 实现的
Promise.reduce(data, (total, item, index) => {
  return makePromise(index, item).then(res => total + res);
}, 0).then(res => console.log(res));

// Promise.mapSeries：顺序执行，返回所有 Promise 结果的数组
Promise.mapSeries(data, (item, index) => makePromise(index, item)).then(res => console.log(res));

// Promise.each：顺序执行，返回原始数组
Promise.each(data, (item, index) => makePromise(index, item)).then(res => console.log(res));