var async = {};
async.series = function( fn_list, final_callback ) {
  if (fn_list.length) {
    var fn = fn_list.shift();
    var callback = function (err) {
      if (err) {
        final_callback(err); // error, abort
      }
      else {
        async.series(fn_list,final_callback);
      }
    };
    fn(callback);
  }
  else {
    final_callback(null); // no errors
  }
}
async.series([
  function (callback) {
    console.log('1');
    callback();
  },
  function (callback) {
    console.log('2');
    callback();
  },
  function (callback) {
    console.log('3');
    callback();
  }
], function (err, result) {
  console.log('4');
});
