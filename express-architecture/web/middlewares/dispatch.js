'use strict';

// pc端和移动端的路由分发
const webCtrl = require('../controllers/web');
const wapCtrl = require('../controllers/wap');

let controllersFuns = [
  {name: 'home', web: true, wap: true},
  {name: 'resource', web: true, wap: false}
];

controllersFuns.forEach(function (controller) {
  let name = controller.name;
  exports[name] = function (req, res, next) {
    let isMobile = req.query.isMobile || '';
    if (controller.wap && isMobile) {
      wapCtrl[name](req, res, next);
    } else {
      webCtrl[name](req, res, next);
    }
  };
});
