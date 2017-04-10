'use strict';

module.exports = {
  index,
  detail
};

function index(req, res, next) {
  res.send('admin');
}

function detail(req, res, next) {
  res.send('admin detail');
}
