'use strict';

var BBPromise = require('bluebird');
var db        = require('../models');
var reject    = BBPromise.reject;

module.exports = {
  list: list
};

function list() {
  return db.Weibo.findAndCount();
}
