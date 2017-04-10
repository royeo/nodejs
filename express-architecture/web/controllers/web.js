'use strict';

module.exports = {
  home,
  getUserInfo
};

function home(req, res, next) {
  res.render('index');
}

function getUserInfo(req, res, next) {

}
