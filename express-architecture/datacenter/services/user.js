'use strict';

module.exports = {
  getPassword
};

function getPassword(opt) {
  return db.User.findOne({where: {name: opt.name}});
}
