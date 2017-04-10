'use strict';

module.exports = {
  index,
  detail
};

function index(req, res, next) {
  res.send('index');
}

function detail(req, res, next) {
  res.send('detail');
}
