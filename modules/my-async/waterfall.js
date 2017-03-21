var async = {};

async.waterfall = function (tasks, cb){
  cb = cb || function () {};

  if (!tasks.length) {
    return cb();
  }

  var taskIndex = 0;

  function nextTask(index, args, cb){
    var task = tasks[index];
    args.push(cb);
    task.apply(null, args);
  }

  function _cb(){
    if (arguments[0] || taskIndex === tasks.length) {
      return cb.apply(null, arguments);
    }

    var rest = [].slice.call(arguments, 1);
    nextTask(taskIndex++, rest, _cb);
  }

  nextTask(taskIndex++, [], _cb);
};

async.waterfall([
  function(callback) {
    callback(null, '1');
  },
  function(arg1, callback) {
    console.log(arg1);
    callback(null, '2', '3');
  },
  function(arg1, arg2, callback) {
    console.log(arg1);
    console.log(arg2);
    callback(null, 'ok');
  }
], function (err, result) {
  console.log(result);
});

