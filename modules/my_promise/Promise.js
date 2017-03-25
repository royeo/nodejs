module.exports = Promise;

function Promise(executor) {
  var self = this;

  self.status = 'pending';      // Promise当前的状态
  self.data = undefined;        // Promise的值
  self.onResolvedCallback = []; // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = []; // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(function() {
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.data = value;
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value);
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function() {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      }
    })
  }

  try {
    executor(resolve, reject);
  }
  catch (reason) {
    reject(reason);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'));
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(function(v) {
        resolvePromise(promise2, v, resolve, reject);
      }, reject);
    }
    else {
      x.then(resolve, reject);
    }
    return;
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) {
            return;
          }
          thenCalledOrThrow = true;
          return resolvePromise(promise2, y, resolve, reject);
        }, function rj(r) {
          if (thenCalledOrThrow) {
            return;
          }
          thenCalledOrThrow = true;
          return reject(r);
        })
      }
      else {
        resolve(x);
      }
    }
    catch (e) {
      if (thenCalledOrThrow) {
        return;
      }
      thenCalledOrThrow = true;
      return reject(e);
    }
  }
  else {
    resolve(x);
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  var self = this;
  var promise2;

  // 如果then的参数不是function，则需要忽略它
  onResolved = typeof onResolved === 'function' ? onResolved : function(v) {
    return v;
  };
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) {
    throw r;
  };

  if (self.status === 'resolved') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { 
        try {
          var x = onResolved(self.data);
          resolvePromise(promise2, x, resolve, reject)
        } 
        catch (reason) {
          reject(reason);
        }
      })
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var x = onRejected(self.data);
          resolvePromise(promise2, x, resolve, reject)
        } 
        catch (reason) {
          reject(reason);
        }
      })
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(value);
          resolvePromise(promise2, x, resolve, reject);
        } 
        catch (r) {
          reject(r);
        }
      });

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject);
        } 
        catch (r) {
          reject(r);
        }
      })
    })
  }
};

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.deferred = Promise.defer = function() {
  var dfd = {};
  dfd.promise = new Promise(function(resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};