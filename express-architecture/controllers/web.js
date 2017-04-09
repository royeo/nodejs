'use strict';

module.exports = {
  index,
  help
};

function index(req, res, next) {
  res.render('index', {title: 'Express'});
}

function help(req, res, next) {
  res.render('help');
}
