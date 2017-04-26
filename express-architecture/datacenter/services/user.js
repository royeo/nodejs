'use strict';

module.exports = {
  getPassword
};

async function getPassword(opt) {
  return await db.User.findOne({where: {name: opt.name}});
}
