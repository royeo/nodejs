'use strict';

module.exports = {
  home,
};

function home(req, res, next) {
  res.render('index');
}
