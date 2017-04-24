let promise = new Promise((resolve, reject) => {
  console.log('Promise');
  resolve();
});

promise.then(() => {
  console.log('Resolved');
});

console.log('Hi');
