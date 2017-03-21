/**
 * Created by admin on 2016/8/22.
 */
/**
 * @file
 * @author Nick
 * @date 16/3/21
 */
"use strict";

var http = require('http'),
  fs = require('fs'),
  path = require('path');

var url = 'http://demos.q-themes.net/designr/v1.3/assets/projects/webdesign5.jpg';

var downloadImg = function (url, cb) {
  http.get(url, function (res) {
    res.pipe(fs.createWriteStream(path.join(__dirname, url.replace(/.*\//, ''))));
    res.on('end', cb);
  });
};

downloadImg(url, function () {
  console.log('done');
});